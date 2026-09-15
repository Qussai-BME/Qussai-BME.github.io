import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ResearchProject } from "@/content/portfolio";
import { StatusTag } from "@/components/StatusTag";

export function ResearchCard({ project, expanded = false }: { project: ResearchProject; expanded?: boolean }) {
  return (
    <article className={expanded ? "research-card research-card--expanded" : "research-card"}>
      <div className="research-card-meta"><span>{project.order}</span><StatusTag status={project.status} /></div>
      <h3>{project.title}</h3>
      <p className="research-card-question"><b>Question</b>{project.question}</p>
      {expanded && <p><b>Method</b>{project.method}</p>}
      <div className="research-card-ledger">
        <p><b>Scope</b>{project.limitation}</p>
        <p><b>Next</b>{project.next}</p>
      </div>
      <Link href={`/research/${project.slug}`} className="research-card-link">View research <ArrowUpRight size={16} /></Link>
    </article>
  );
}
