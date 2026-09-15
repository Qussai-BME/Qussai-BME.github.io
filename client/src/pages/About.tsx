import { ArrowUpRight, Compass, GraduationCap, Layers, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { RouteAxis } from "@/components/RouteAxis";
import { humanMotorIntelligence, profile, technicalCategories } from "@/content/portfolio";
import { SEO } from "@/components/SEO";

const PHILOSOPHY = [
  ["Generalisation over memorisation", "I care about whether a model works on people it never saw during training. A good average across familiar subjects doesn't answer that, so I keep re-asking the same question in a new modality each time: sEMG, then EEG, then fusion."],
  ["Evidence over hype", "A claim is only as good as the protocol behind it. \"Observed in 22 subjects under strict LOSO\" tells you something you can go check. \"State-of-the-art\" doesn't."],
  ["Reproducibility over screenshots", "If I can't rerun a result and get the same file back, it isn't a result yet. It's a story about one. That's why byte-identical reruns and an independent statistical recheck show up across most of this programme."],
  ["Systems over isolated demos", "A decoding accuracy number is only half the question. What happens once that output feeds into a controller or a task is where new failure modes show up, and where the real evaluation has to happen."],
] as const;

const FUTURE_TIERS = [
  {
    label: "Demonstrated",
    heading: "What the evidence already supports",
    items: ["A validated, three-database sEMG benchmark exposing rest-class metric inflation.", "A diagnosed mechanism for why linear domain adaptation fails on MiniROCKET features.", "A reproducible 54-subject external EEG validation with an explicit power analysis.", "A reproducible 24-subject EEG–EMG fusion validation, including a confidence-miscalibration finding under signal degradation."],
  },
  {
    label: "Active",
    heading: "Currently being completed",
    items: ["Lite-DAN: learned subject-invariant representations, evaluated under a protocol locked before results are read.", "SurgIntent: graduation thesis research connecting subject-held-out state inference to a deterministic authorisation policy."],
  },
  {
    label: "Next",
    heading: "Immediate extension",
    items: ["Authenticated decoder-quality traces for Paper 6, once Paper 3 reaches a locked result.", "A second, independent EEG–EMG cohort to test whether the fusion finding generalises beyond one dataset."],
  },
  {
    label: "Long-term",
    heading: "The direction this is building toward",
    items: ["Noninvasive BCI research grounded in the same zero-calibration discipline.", "Subject-aware adaptive rehabilitation research.", "Intelligent, evidence-bounded surgical robotics."],
  },
] as const;

export default function About() {
  return <><SEO title="Academic Journey" description="Why cross-subject motor-intent decoding, told through academic formation, research philosophy, technical scope, and a future research direction with each stage kept explicit." path="/about" />
    
    <section className="page-hero about-hero"><p className="section-kicker-v3">Academic journey</p><h1>Why this research <em>question?</em></h1><p>I ended up here because the failure mode bothered me: a model can look completely reliable in testing, then fall apart the moment it meets someone whose signal patterns weren't in the training set. Whether a result is worth connecting to an assistive device, a BCI, or a human-robot collaboration question comes down to how it handles exactly that moment.</p></section>

    <RouteAxis context="ACADEMIC JOURNEY" stages={[{ label: "Foundation", detail: "biosignals and instrumentation" }, { label: "Philosophy", detail: "four working principles" }, { label: "Direction", detail: "evidence-gated systems research" }]} />

    <section className="about-body">
      <article><small>FOUNDATION · 01</small><GraduationCap size={22} /><h2>Biomedical engineering as a starting point</h2><p>My undergraduate degree gives me the engineering grounding I actually use day to day: biosignals, instrumentation, medical-device design, computational methods. Everything I do now is that foundation narrowed down to one specific problem: decoding motor intent across subjects.</p></article>
      <article><small>MOBILITY · 02</small><GraduationCap size={22} /><h2>International academic experience</h2><p>I spent a semester at Pázmány Péter Catholic University in Budapest through Erasmus+. It's given me a real feel for a different university system and how to work across academic cultures. It's a mobility term, not a degree or a research appointment, and I don't present it as either.</p></article>
      <article><small>INTEGRATION · 03</small><ShieldCheck size={22} /><h2>Human Motor Intelligence</h2><p>{humanMotorIntelligence.description} The integrated demo itself runs on synthetic fixtures for testing how the pieces connect. It's not a live biosignal benchmark or a clinical product.</p></article>
    </section>

    <section className="philosophy-section" aria-labelledby="philosophy-title">
      <div className="philosophy-heading"><p className="section-kicker-v3">Research philosophy</p><h2 id="philosophy-title">Four working <em>principles,</em> not slogans.</h2><p>{profile.longQuestion}</p></div>
      <div className="philosophy-grid">{PHILOSOPHY.map(([title, text]) => <article key={title}><Compass size={19} /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="tech-scope-section" aria-labelledby="tech-scope-title">
      <div><p className="section-kicker-v3">Technical scope</p><h2 id="tech-scope-title">What the programme is actually <em>built with.</em></h2></div>
      <div className="tech-scope-grid">{technicalCategories.map(([title, skills]) => <article key={title}><Layers size={17} /><h3>{title}</h3><p>{skills}</p></article>)}</div>
    </section>

    <section className="future-tiers-section" aria-labelledby="future-tiers-title">
      <div><p className="section-kicker-v3">Future research</p><h2 id="future-tiers-title">Four stages, <em>from finished to future.</em></h2><p>Below: what's done, what's active, what's next, and where I want to take it.</p></div>
      <div className="future-tiers-grid">{FUTURE_TIERS.map((tier) => <article key={tier.label} className={`future-tier future-tier--${tier.label.toLowerCase()}`}><span className="future-tier-label">{tier.label}</span><h3>{tier.heading}</h3><ul>{tier.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </section>

    <section className="section-close"><p>What I don't have yet is the advanced coursework, lab access, and close supervision that graduate study provides. That's exactly why it's the next step, not a formality.</p><Link href="/research" className="action-primary">See the research programme <ArrowUpRight size={16} /></Link></section>
  </>;
}
