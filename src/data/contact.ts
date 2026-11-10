export const CONTACT_INFO = [
  { label: "TEL", value: "062-383-2838" },
  { label: "EMAIL", value: "wizcni2004@naver.com" },
  { label: "ADDRESS", value: "전남광주통합특별시 북구 첨단연신로 45 A동 6층" },
  { label: "HOURS", value: "평일 09:00 - 18:00" },
];

// TODO: 새 사무실의 네이버 플레이스 페이지가 등록되면 그 URL(https://map.naver.com/p/entry/place/...)로
// 교체해 주세요. 아직 등록 전이라, 우선 주소 기반 네이버 지도 검색 링크로 연결합니다.
export const NAVER_PLACE_URL = `https://map.naver.com/p/search/${encodeURIComponent(
  CONTACT_INFO.find((i) => i.label === "ADDRESS")!.value
)}`;

// 새 사무실 좌표(35° 12' 5.60" N, 126° 51' 48.50" E를 10진수로 변환).
// Geocoding API가 이 주소를 관공서 좌표로 잘못 변환하는 문제가 있어 고정값을 사용한다
// (이유는 NaverMap.tsx의 coordinates 설명 참고).
export const OFFICE_COORDINATES: { lat: number; lng: number } | undefined = {
  lat: 35.201556,
  lng: 126.863472,
};

export const PROJECT_TYPES = [
  { ko: "영상제작", en: "FILM PRODUCTION" },
  { ko: "모션그래픽", en: "MOTION GRAPHICS" },
  { ko: "편집", en: "EDITING" },
  { ko: "라이브 중계", en: "LIVE PRODUCTION" },
  { ko: "공간 미디어", en: "SPACE MEDIA" },
  { ko: "스튜디오 대관", en: "STUDIO RENTAL" },
  { ko: "기타", en: "OTHER" },
];

export const BUDGET_RANGES = [
  "미정",
  "500만원 이하",
  "500만원 ~ 1,000만원",
  "1,000만원 ~ 3,000만원",
  "3,000만원 ~ 5,000만원",
  "5,000만원 이상",
];

export const ALLOWED_ATTACHMENT_EXTENSIONS = [
  ".pdf",
  ".ppt",
  ".pptx",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
];

// Supabase Storage에 브라우저가 직접 업로드하는 방식이라, 더 이상 Vercel
// 서버리스 함수의 요청 본문 크기 제한(약 4.5MB)에 걸리지 않는다.
export const MAX_ATTACHMENT_SIZE_MB = 20;

// 첨부파일 여러 개를 합친 전체 용량 한계 (스토리지 사용량 관리 목적).
export const MAX_TOTAL_ATTACHMENT_SIZE_MB = 50;

export const CONTACT_ATTACHMENTS_BUCKET = "contact-attachments";
