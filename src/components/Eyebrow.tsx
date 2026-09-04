type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "accent" | "muted";
};

export default function SectionLabel({ children, tone = "accent" }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-bold tracking-[0.15em] uppercase ${
        tone === "accent" ? "text-accent" : "text-muted"
      }`}
    >
      {children}
    </p>
  );
}
