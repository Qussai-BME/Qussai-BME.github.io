import { ArrowUpRight, CircleCheck } from "lucide-react";
import { Link } from "wouter";
import { methodTerms, profile, researchProjects, researchStages } from "@/content/portfolio";
import { ResearchCard } from "@/components/ResearchCard";
import { SEO } from "@/components/SEO";

export default function Research() {
  const core = researchProjects.filter((p) => p.track === "core");
  const extension = researchProjects.filter((p) => p.track === "extension");
  return <><SEO title="Research Programme" description="A six-part, two-track research programme on cross-subject sEMG and EEG decoding: metric integrity, domain-adaptation failure, learned invariance, EEG replication, multimodal fusion, and systems evidence." path="/research" />
    
    <section className="page-hero"><p className="section-kicker-v3">Human Motor Intelligence</p><h1>One methodological question, tested in <em>two tracks.</em></h1><p>{profile.longQuestion}</p></section>
    <section className="route-intro"><div><span>How this is organised</span><h2>Measure → Understand → Test → Extend → Compare → Trace</h2></div><p>The core track (01–03) is a coherent, self-contained argument about cross-subject sEMG. The extension track (04–06) tests whether that same argument holds outside sEMG. Each record states its current evidence, its scope, and its next question.</p></section>
    <section className="research-index"><div className="research-index-sidebar"><span>RESEARCH SEQUENCE</span>{researchStages.map(([n, title, , evidence]) => <div key={n}><b>{n}</b><p><strong>{title}</strong>{evidence}</p></div>)}</div><div className="research-index-list">
      <p className="track-heading">Core programme — cross-subject sEMG</p>
      {core.map((project) => <ResearchCard project={project} expanded key={project.slug} />)}
      <p className="track-heading track-heading--extension">Extension — EEG, multimodal fusion & systems</p>
      {extension.map((project) => <ResearchCard project={project} expanded key={project.slug} />)}
    </div></section>
    <section className="method-glossary"><div><p className="section-kicker-v3">Method vocabulary</p><h2>A few terms, defined <em>plainly.</em></h2><p>These come up throughout the research pages. Defining them here means I don't have to re-explain them on every page.</p></div><div className="term-list">{methodTerms.map(([term, definition], index) => <article key={term}><span>{String(index + 1).padStart(2, "0")}</span><h3>{term}</h3><p>{definition}</p></article>)}</div></section>
    <section className="section-close"><CircleCheck size={18} /><p>The links above go to the actual source code and archives. If you want to know whether a specific project fits a programme's requirements, the project page plus the CV will tell you more than the repository name does.</p><Link href="/outputs">See all outputs and resources <ArrowUpRight size={15} /></Link></section>
  </>;
}
