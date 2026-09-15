import { ArrowDownToLine, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { profile, profiles } from "@/content/portfolio";
import { LogoMark } from "@/components/Diagrams";

export function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header-v3">
        <Link href="/" className="site-brand" onClick={closeMenu} aria-label="Qussai Adlbi research dossier home">
          <span className="brand-pulse" aria-hidden="true"><i /><i /><i /></span>
          <LogoMark size={26} />
          <span><b>{profile.name}</b><small>Biomedical Engineering</small></span>
        </Link>
        <button className="site-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "site-nav-v3 site-nav-v3--open" : "site-nav-v3"} aria-label="Primary navigation">
          <Link href="/research" onClick={closeMenu}>Research</Link>
          <Link href="/systems" onClick={closeMenu}>Systems</Link>
          <Link href="/outputs" onClick={closeMenu}>Evidence</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/cv" onClick={closeMenu}>CV</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <a className="nav-cv" href={profile.cvDownload} download onClick={closeMenu}>Download CV <ArrowDownToLine size={14} /></a>
        </nav>
      </header>
      <main id="main-content">
        <div className="global-research-axis" aria-label="Research axis: signal, representation, action">
          <span>Signal</span><i /><span>Representation</span><i /><span>Action</span>
        </div>
        {children}
      </main>
      <footer className="site-footer-v3">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="footer-identity">Biomedical Engineering · Biomedical AI · Biosignals · Neuroengineering</span>
        <span className="footer-links">
          <a href={`mailto:${profile.email}`} aria-label="Email Qussai Adlbi"><Mail size={14} /></a>
          <a href={profiles[0].href} target="_blank" rel="noreferrer" aria-label="Qussai Adlbi on LinkedIn"><Linkedin size={14} /></a>
          <a href={profiles[1].href} target="_blank" rel="noreferrer" aria-label="Qussai Adlbi on GitHub"><Github size={14} /></a>
        </span>
      </footer>
    </div>
  );
}
