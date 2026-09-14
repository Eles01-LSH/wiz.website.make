export const CONTACT_INFO = [
  { label: "TEL", value: "062-383-2838" },
  { label: "EMAIL", value: "wizcni2004@naver.com" },
  { label: "ADDRESS", value: "전남광주 서구 화개중앙로 2 3층" },
  { label: "HOURS", value: "평일 09:00 - 18:00" },
];

export const NAVER_PLACE_URL = "https://map.naver.com/p/entry/place/876646054";

// 네이버 플레이스(위 URL)에 등록된 실제 좌표. Geocoding API로 주소 문자열을 변환하면
// 어긋난 위치(관공서 등)로 튀는 현상이 있어, 플레이스 데이터 기준 좌표를 직접 고정해서 쓴다.
export const OFFICE_COORDINATES = { lat: 35.1223342, lng: 126.861011 };

export const PROJECT_TYPES = [
  { ko: "영상제작", en: "FILM PRODUCTION" },
  { ko: "모션그래픽", en: "MOTION GRAPHICS" },
  { ko: "편집", en: "EDITING" },
  { ko: "라이브 중계", en: "LIVE PRODUCTION" },
  { ko: "공간 미디어", en: "SPACE MEDIA" },
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
