import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail, Orbit } from "lucide-react";
import { profile, profiles } from "@/content/portfolio";
import { SEO } from "@/components/SEO";

const iconFor = (label: string) => label === "LinkedIn" ? <Linkedin size={19} /> : label === "GitHub" ? <Github size={19} /> : <Orbit size={19} />;

const noteFor = (label: string) => label === "GitHub" ? "Source code for every project on this site." : label === "ORCID" ? "My researcher identifier." : label === "Google Scholar" ? "Citations, once there are any." : label === "ResearchGate" ? "Another place to find the same work." : "Career updates and a shorter version of the CV.";

export default function Contact() {
  return <><SEO title="Contact" description="Get in touch about research collaboration, graduate study, biosignal AI, or reproducible research." path="/contact" />
    <section className="page-hero contact-hero"><p className="section-kicker-v3">Contact</p><h1>Let's talk research.</h1><p>Email is the quickest way to reach me about graduate study, research collaboration, or questions about the work.</p></section><section className="contact-grid"><a className="contact-feature" href={`mailto:${profile.email}`}><Mail size={23} /><span>EMAIL</span><h2>{profile.email}</h2><p>Usually the quickest way to reach me.</p><small>I read everything that comes in here</small><ArrowUpRight size={18} /></a>{profiles.map((item) => <a className="contact-feature" href={item.href} target="_blank" rel="noreferrer" key={item.label}>{iconFor(item.label)}<span>{item.label.toUpperCase()}</span><h2>{item.label}</h2><p>{noteFor(item.label)}</p><small>Opens in a new tab</small><ArrowUpRight size={18} /></a>)}</section><section className="download-band"><div><p className="section-kicker-v3">CV</p><h2>The full academic CV, as one PDF.</h2></div><a href={profile.cvDownload} download className="action-primary">Download the CV <ArrowDownToLine size={16} /></a></section></>;
}
