"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const SURVEY_URL = "https://cnuhh.vercel.app/survey";

export default function SurveyQrCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, SURVEY_URL, {
        width: 220,
        margin: 1,
        color: { dark: "#0b0b0c", light: "#ffffff" },
      });
    }
  }, []);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "화순전남대학교병원-심포지엄-설문-qr코드.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-md border border-line bg-paper p-6">
      <h2 className="text-sm font-black text-ink">설문 참여 QR 코드</h2>
      <p className="mt-1 text-xs text-muted">
        스캔하면 설문조사 페이지로 바로 이동합니다. 현장 안내판 등에 인쇄해서 사용하세요.
      </p>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-[220px] w-[220px] shrink-0 items-center justify-center rounded-md border border-line bg-white">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="break-all rounded-md bg-mist px-3 py-2 text-xs text-muted">{SURVEY_URL}</p>
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
