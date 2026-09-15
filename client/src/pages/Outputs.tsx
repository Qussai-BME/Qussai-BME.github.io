import { ArrowUpRight, BookOpen, Code2, FileText } from "lucide-react";
import { Link } from "wouter";
import { RouteAxis } from "@/components/RouteAxis";
import { researchProjects, softwareResources } from "@/content/portfolio";
import { StatusTag } from "@/components/StatusTag";
import { SEO } from "@/components/SEO";

export default function Outputs() {
  const manuscripts = researchProjects.filter((item) => item.status === "MANUSCRIPT_SUPERVISORY_REVIEW" || item.status === "MANUSCRIPT_SUBMITTED" || item.status === "MANUSCRIPT_FINALISATION" || item.status === "MANUSCRIPT_IN_PREPARATION");
  const inProgress = researchProjects.filter((item) => item.status === "RESEARCH_IN_PROGRESS");
  return <><SEO title="Evidence & Outputs" description="Publications, manuscripts, released research software, and research in progress, organised by evidence type. Nothing here is presented beyond its actual stage." path="/outputs" />
    
    <section className="page-hero"><p className="section-kicker-v3">Research outputs</p><h1>Outputs arranged by <em>evidence type.</em></h1><p>Publication, manuscript, released software, and research in progress are kept as separate categories. A public link is shown without inflating what it proves.</p></section>
    <RouteAxis context="OUTPUTS" stages={[{ label: "Classify", detail: "separate evidence types" }, { label: "Inspect", detail: "read the record and its scope" }, { label: "Trace", detail: "follow the next research step" }]} />
    <section className="outputs-register">
      <article className="register-section"><header className="register-heading"><BookOpen size={20} /><div><span>01 · PEER-REVIEWED PUBLICATIONS</span><h2>Nothing is listed without verified publication evidence.</h2></div></header><div className="register-record register-record--notice"><div className="record-meta"><span>Publication record</span><b>None listed</b></div><div><h3>Transparency takes precedence over a placeholder citation.</h3><p>Manuscript, archive, and software evidence are kept in their own registers rather than presented as peer-reviewed publication.</p></div></div></article>
      <article className="register-section"><header className="register-heading"><FileText size={20} /><div><span>02 · MANUSCRIPTS</span><h2>Written work at a stated, honest stage.</h2></div></header><div>{manuscripts.map((project, index) => <div className="register-record" key={project.slug}><div className="record-meta"><span>Record {String(index + 1).padStart(2, "0")}</span><StatusTag status={project.status} /></div><div><h3>{project.title}</h3><p>{project.question}</p><Link href={`/research/${project.slug}`}>Inspect record <ArrowUpRight size={14} /></Link></div></div>)}</div></article>
      <article className="register-section"><header className="register-heading"><Code2 size={20} /><div><span>03 · RELEASED RESEARCH SOFTWARE</span><h2>Open code and reproducible releases.</h2></div></header><div>{softwareResources.map((resource, index) => <div className="register-record" key={resource.id}><div className="record-meta"><span>Release {String(index + 1).padStart(2, "0")}</span><StatusTag status={resource.status} /></div><div><h3>{resource.title}{"version" in resource && resource.version ? ` ${resource.version}` : ""}</h3><p>{resource.role}. {resource.description}</p><div className="register-links">{resource.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <ArrowUpRight size={13} /></a>)}</div></div></div>)}</div></article>
      <article className="register-section"><header className="register-heading"><FileText size={20} /><div><span>04 · RESEARCH IN PROGRESS</span><h2>Active questions, not yet results.</h2></div></header><div>{inProgress.map((project) => <div className="register-record" key={project.slug}><div className="record-meta"><span>Scope record</span><StatusTag status={project.status} /></div><div><h3>{project.title}</h3><p>{project.limitation}</p><Link href={`/research/${project.slug}`}>Inspect scope <ArrowUpRight size={14} /></Link></div></div>)}</div></article>
    </section>
  </>;
}
