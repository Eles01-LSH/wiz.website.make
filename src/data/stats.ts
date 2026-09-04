export type ExperienceStat = {
  value: number;
  suffix: string;
  label: string;
  desc: string;
};

export const EXPERIENCE_STATS: ExperienceStat[] = [
  { value: 20, suffix: "+", label: "YEARS", desc: "Production Experience" },
  { value: 50, suffix: "+", label: "CLIENTS", desc: "Public · Corporate · Medical" },
  { value: 100, suffix: "+", label: "PROJECTS", desc: "Film · Motion · Live · Media" },
];
