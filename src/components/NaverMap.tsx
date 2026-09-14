"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MapPinIcon } from "@/components/icons";

type LatLng = { toString: () => string };

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (el: HTMLElement, options: Record<string, unknown>) => {
          setCenter: (p: LatLng) => void;
        };
        LatLng: new (lat: number, lng: number) => LatLng;
        Size: new (width: number, height: number) => unknown;
        Point: new (x: number, y: number) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
        InfoWindow: new (options: Record<string, unknown>) => {
          open: (map: unknown, marker?: unknown) => void;
          close: () => void;
          getMap: () => unknown;
        };
        Event: {
          addListener: (target: unknown, eventName: string, handler: () => void) => unknown;
        };
        Position: { TOP_RIGHT: unknown };
        Service?: {
          geocode: (
            options: { query: string },
            callback: (status: string, response: NaverGeocodeResponse) => void
          ) => void;
          Status: { OK: string };
        };
      };
    };
  }
}

type NaverGeocodeResponse = {
  v2?: { addresses?: { x: string; y: string }[] };
};

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

// 실좌표를 임의로 추정하지 않기 위해, Geocoding 결과가 도착하기 전까지만 쓰는
// 광주광역시 서구 일대 임시 초기 중심점입니다(최종 위치는 항상 geocode 결과로 대체됨).
const INITIAL_CENTER = { lat: 35.1595, lng: 126.8526 };

const MARKER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" viewBox="0 0 36 46">
  <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 28 18 28s18-14.5 18-28C36 8.06 27.94 0 18 0Z" fill="#1d4ed8"/>
  <circle cx="18" cy="18" r="7" fill="#ffffff"/>
</svg>`;

type NaverMapProps = {
  address: string;
  fallbackHref: string;
  companyName?: string;
  /**
   * 알려진 정확한 좌표(네이버 플레이스 기준). 지정하면 Geocoding API 호출을 건너뛰고
   * 이 좌표를 그대로 쓴다 — 주소 문자열이 동일해도 Geocoding API 결과가 네이버
   * 플레이스 좌표와 어긋나는 경우가 있어(관공서 등 엉뚱한 위치로 튀는 현상 확인됨),
   * 정확한 위치가 필요하면 좌표를 직접 넘기는 편이 안전하다.
   */
  coordinates?: { lat: number; lng: number };
};

export default function NaverMap({
  address,
  fallbackHref,
  companyName = "WIZ CNI",
  coordinates,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  function placeMarker(
    naver: NonNullable<Window["naver"]>,
    map: unknown,
    position: LatLng
  ) {
    const marker = new naver.maps.Marker({
      position,
      map,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(MARKER_SVG)}`,
        size: new naver.maps.Size(36, 46),
        anchor: new naver.maps.Point(18, 46),
      },
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: `
        <div style="padding:12px 14px;min-width:200px;font-family:inherit;">
          <p style="margin:0;font-weight:800;font-size:13px;color:#0b0b0c;">${companyName}</p>
          <p style="margin:4px 0 8px;font-size:12px;line-height:1.5;color:#6b7280;">${address}</p>
          <a href="${fallbackHref}" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:600;color:#1d4ed8;text-decoration:none;">
            네이버 지도에서 크게 보기 →
          </a>
        </div>
      `,
      borderWidth: 0,
      backgroundColor: "transparent",
    });

    naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
  }

  function initMap() {
    const naver = window.naver;
    const el = mapRef.current;
    if (!naver || !el) {
      setFailed(true);
      return;
    }

    const initialCenter = new naver.maps.LatLng(INITIAL_CENTER.lat, INITIAL_CENTER.lng);
    const map = new naver.maps.Map(el, {
      center: initialCenter,
      zoom: 16,
      draggable: true,
      pinchZoom: true,
      scrollWheel: true,
      keyboardShortcuts: true,
      zoomControl: true,
      zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
    });

    if (coordinates) {
      const point = new naver.maps.LatLng(coordinates.lat, coordinates.lng);
      map.setCenter(point);
      placeMarker(naver, map, point);
    } else if (naver.maps.Service) {
      naver.maps.Service.geocode({ query: address }, (status, response) => {
        const result =
          status === naver.maps.Service?.Status.OK ? response.v2?.addresses?.[0] : undefined;

        if (result) {
          const point = new naver.maps.LatLng(Number(result.y), Number(result.x));
          map.setCenter(point);
          placeMarker(naver, map, point);
        } else {
          // Geocoding 실패 시 최후 수단으로만 임시 중심점에 마커 표시
          placeMarker(naver, map, initialCenter);
        }
      });
    } else {
      placeMarker(naver, map, initialCenter);
    }
  }

  // next/script는 src 기준으로 중복 삽입을 막기 때문에, 클라이언트 사이드 이동으로
  // 이 페이지에 다시 들어왔을 때(스크립트가 이전 방문에서 이미 로드된 상태)는
  // onLoad가 다시 호출되지 않아 지도가 비어 보인다 — 마운트 시점에 이미 로드돼
  // 있으면 여기서 직접 초기화한다.
  useEffect(() => {
    if (window.naver) initMap();
  }, []);

  if (!CLIENT_ID || failed) {
    return (
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-72 flex-col items-center justify-center gap-2 rounded-md border border-line bg-mist text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent sm:h-80 lg:h-96"
      >
        <MapPinIcon />
        네이버 지도에서 위치 보기
        <span aria-hidden>→</span>
      </a>
    );
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-md border border-line bg-mist sm:h-80 lg:h-96">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={initMap}
        onError={() => setFailed(true)}
      />
      <div ref={mapRef} className="h-full w-full" />
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur transition-colors hover:text-accent"
      >
        네이버 지도에서 크게 보기 →
      </a>
    </div>
  );
}
