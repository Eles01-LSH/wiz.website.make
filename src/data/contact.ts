export const CONTACT_INFO = [
  { label: "TEL", value: "062-383-2838" },
  { label: "EMAIL", value: "wizcni2004@naver.com" },
  { label: "ADDRESS", value: "전남광주통합특별시 서구 화개중앙로 2, 3층 (금호동)" },
  { label: "HOURS", value: "평일 09:00 - 18:00" },
];

export const NAVER_PLACE_URL = "https://map.naver.com/p/entry/place/876646054";

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

// Vercel 서버리스 함수의 요청 본문 크기 제한(약 4.5MB)과 base64 인코딩 오버헤드(약 33%)를
// 감안한 안전한 최대치. 이보다 크게 잡으면 실제로는 전송 자체가 실패한다.
export const MAX_ATTACHMENT_SIZE_MB = 3;

// 첨부파일 여러 개를 합친 전체 용량 한계 (역시 같은 요청 본문 크기 제한 때문에 필요).
export const MAX_TOTAL_ATTACHMENT_SIZE_MB = 3;
