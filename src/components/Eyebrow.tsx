type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
};

export default function SectionLabel({ children, tone = "accent", className }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-bold tracking-[0.15em] uppercase ${
        tone === "accent" ? "text-accent" : "text-muted"
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}
