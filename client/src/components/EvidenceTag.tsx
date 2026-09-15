type EvidenceTagProps = {
  children: string;
  tone?: "grounded" | "progress" | "gate" | "external";
};

const toneClass = {
  grounded: "tag--grounded",
  progress: "tag--progress",
  gate: "tag--gate",
  external: "tag--external",
};

export function EvidenceTag({ children, tone = "grounded" }: EvidenceTagProps) {
  return <span className={`evidence-tag ${toneClass[tone]}`}>{children}</span>;
}
