import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { humanMotorIntelligence, softwareResources } from "@/content/portfolio";
import { StatusTag } from "@/components/StatusTag";
import { SystemsMapDiagram } from "@/components/Diagrams";
import { SEO } from "@/components/SEO";
import { JsonLd, softwareSchema } from "@/components/JsonLd";

export default function Systems() {
  return <><SEO title="Research Systems" description="BioSignal-FM, MyoAdapt, MyoControl, and MyoSim: the research infrastructure supporting the Human Motor Intelligence programme." path="/systems" />
    
    <section className="page-hero"><p className="section-kicker-v3">Research infrastructure</p><h1>The software behind <em>Human Motor Intelligence.</em></h1><p>Four platforms, each one runnable on its own, handle measurement, adaptation, reproducibility, and simulation for the programme. They're research tools I built to run my own experiments. Not products, and nothing clinical.</p></section>

    <section className="systems-map-section">
      <SystemsMapDiagram />
    </section>

    <section className="detail-content" style={{ marginTop: 0 }}>
      <article id="hmi"><span>—</span><div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
          <h2 style={{ margin: 0 }}>{humanMotorIntelligence.title}</h2>
          <StatusTag status={humanMotorIntelligence.status} />
        </div>
        <p>{humanMotorIntelligence.description}</p>
        <div className="hmi-status-grid">
          <div><span className="hmi-status-label">Research programme</span><p>{humanMotorIntelligence.programmeStatus}</p></div>
          <div><span className="hmi-status-label">Current public release</span><p>{humanMotorIntelligence.publicReleaseStatus}</p></div>
          <div><span className="hmi-status-label">Public release scope</span><p>{humanMotorIntelligence.publicReleaseScope}</p></div>
        </div>
        <div className="boundary-box"><ShieldCheck size={19} /><div><h3>Scope</h3><p>{humanMotorIntelligence.boundary}</p></div></div>
        <div className="detail-links">{humanMotorIntelligence.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <ArrowUpRight size={14} /></a>)}</div>
      </div></article>

      {softwareResources.map((resource) => <article id={resource.id} key={resource.id}><span>—</span><div>
        <JsonLd data={softwareSchema({ name: resource.title, description: resource.description, codeRepository: resource.links.find((l) => l.kind === "repository")?.href })} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
          <h2 style={{ margin: 0 }}>{resource.title}{"version" in resource && resource.version ? ` ${resource.version}` : ""}</h2>
          <StatusTag status={resource.status} />
        </div>
        <p><b>{resource.role}.</b> {resource.description}</p>
        <div className="detail-links">{resource.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <ArrowUpRight size={14} /></a>)}</div>
      </div></article>)}
    </section>

    <section className="section-close"><ShieldCheck size={18} /><p>All four are open source. The code, the archived releases, and the commit history are the actual record of what each one does.</p></section>
  </>;
}
