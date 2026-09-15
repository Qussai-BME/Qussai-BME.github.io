import { ClaimStatus, statusMeta } from "@/content/portfolio";

export function StatusTag({ status }: { status: ClaimStatus }) {
  const meta = statusMeta[status];
  return <span className={`status-tag status-tag--${meta.tone}`}>{meta.label}</span>;
}
