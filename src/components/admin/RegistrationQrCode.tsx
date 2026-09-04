"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function RegistrationQrCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url] = useState<string | null>(() =>
    typeof window !== "undefined" ? `${window.location.origin}/register` : null
  );

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 220,
        margin: 1,
        color: { dark: "#0b0b0c", light: "#ffffff" },
      });
    }
  }, [url]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "wiz-cni-사전등록-qr코드.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-md border border-line bg-paper p-6">
      <h2 className="text-sm font-black text-ink">사전등록 QR 코드</h2>
      <p className="mt-1 text-xs text-muted">
        스캔하면 사전등록 페이지로 바로 이동합니다. 포스터, 현수막, 안내 데스크 등에 인쇄해서 사용하세요.
      </p>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-[220px] w-[220px] shrink-0 items-center justify-center rounded-md border border-line bg-white">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-3">
          {url && (
            <p className="break-all rounded-md bg-mist px-3 py-2 text-xs text-muted">{url}</p>
          )}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            PNG 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
