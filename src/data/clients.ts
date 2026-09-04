export type Client = {
  name: string;
  file: string;
  /** Optical size multiplier — logos vary in visual weight (wordmark vs symbol,
   * horizontal vs vertical), so widths aren't forced equal. Tune per logo. */
  scale: number;
};

export const CLIENTS: Client[] = [
  { name: "광주광역시", file: "gwangju-city", scale: 0.95 },
  { name: "전라남도", file: "jeollanamdo", scale: 0.95 },
  { name: "문화체육관광부", file: "mcst", scale: 1.05 },
  { name: "중소벤처기업부", file: "mss", scale: 1.05 },
  { name: "전남대학교병원", file: "cnuh", scale: 0.95 },
  { name: "ETRI 한국전자통신연구원", file: "etri", scale: 0.85 },
  { name: "KBSI 한국기초과학지원연구원", file: "kbsi", scale: 0.85 },
  { name: "KENTECH 한국에너지공과대학교", file: "kentech", scale: 0.85 },
  { name: "KBS미디어텍", file: "kbs-mediatech", scale: 0.95 },
  { name: "영화진흥위원회 KOFIC", file: "kofic", scale: 0.9 },
  { name: "국립아시아문화전당재단", file: "asia-culture-center-foundation", scale: 0.95 },
  { name: "광주문화재단", file: "gwangju-cultural-foundation", scale: 1.0 },
  { name: "김대중컨벤션센터", file: "kimdaejung-convention-center", scale: 0.9 },
  { name: "광주관광재단", file: "gjto", scale: 0.95 },
  { name: "광주은행", file: "gwangju-bank", scale: 0.9 },
  { name: "한국디자인진흥원", file: "kidp", scale: 0.95 },
  { name: "한국문화원연합회", file: "korean-cultural-centers", scale: 1.0 },
];

export const CERTIFICATIONS = ["수출바우처 수행기관", "중소기업 혁신바우처 공급기업"];
