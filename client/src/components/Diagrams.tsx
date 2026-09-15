/**
 * Inline SVG diagrams for the site, so they inherit the page's type and color
 * tokens instead of loading external image files.
 */
import { useEffect, useRef, useState } from "react";
import { researchStages } from "@/content/portfolio";

const INK = "#14241f";
const SIGNAL = "#0d6b66";
const SIGNAL_DEEP = "#104a47";
const CORAL = "#b75f48";
const LINE = "rgba(20,36,31,0.28)";
const PAPER = "#f6f1e9";

/** Small three-bar signal-pulse monogram, used as the site mark / favicon source. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="5" height="14" rx="1" fill={CORAL} />
      <rect x="13.5" y="6" width="5" height="22" rx="1" fill={SIGNAL} />
      <rect x="23" y="18" width="5" height="10" rx="1" fill={SIGNAL_DEEP} />
    </svg>
  );
}

/** Hero diagram: biosignal -> representation -> unseen subject -> motor intent. */
export function HeroDiagram() {
  const nodes = [
    { x: 60, label: "Biosignal", sub: "raw sEMG / EEG" },
    { x: 260, label: "Representation", sub: "learned feature space" },
    { x: 460, label: "Unseen subject", sub: "held out entirely" },
    { x: 660, label: "Motor intent", sub: "decoded output" },
  ];
  return (
    <svg viewBox="0 0 720 260" width="100%" role="img" aria-labelledby="heroDiagramTitle">
      <title id="heroDiagramTitle">Diagram: a biosignal is transformed into a representation, evaluated on a subject the model has never seen, and decoded into motor intent</title>
      <line x1="60" y1="120" x2="660" y2="120" stroke={LINE} strokeWidth="1.5" />
      {nodes.slice(0, -1).map((n, i) => (
        <polygon key={i} points={`${n.x + 155},116 ${n.x + 155},124 ${n.x + 168},120`} fill={SIGNAL} />
      ))}
      {/* Node 1: waveform */}
      <g transform={`translate(${nodes[0].x - 34},86)`}>
        <rect x="0" y="0" width="68" height="68" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.35" />
        <path d="M6 34 L16 34 L21 16 L28 52 L34 22 L39 42 L46 34 L62 34" fill="none" stroke={CORAL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Node 2: representation grid */}
      <g transform={`translate(${nodes[1].x - 34},86)`}>
        <rect x="0" y="0" width="68" height="68" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.35" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={10 + c * 13} y={10 + r * 13} width="9" height="9"
            fill={SIGNAL} opacity={0.25 + ((r * 4 + c) % 5) * 0.14} />
        )))}
      </g>
      {/* Node 3: unseen subject (dashed outline = held out) */}
      <g transform={`translate(${nodes[2].x - 34},86)`}>
        <rect x="0" y="0" width="68" height="68" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.35" />
        <circle cx="34" cy="24" r="10" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
        <path d="M18 58 Q34 36 50 58" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
      </g>
      {/* Node 4: decoded intent = directional arrow burst */}
      <g transform={`translate(${nodes[3].x - 34},86)`}>
        <rect x="0" y="0" width="68" height="68" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.35" />
        <circle cx="34" cy="34" r="4" fill={SIGNAL_DEEP} />
        <path d="M34 34 L52 20" stroke={SIGNAL_DEEP} strokeWidth="2.4" strokeLinecap="round" markerEnd="url(#arrow)" />
      </g>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={SIGNAL_DEEP} />
        </marker>
      </defs>
      {nodes.map((n, i) => (
        <g key={i}>
          <text x={n.x} y="176" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="13" fill={INK}>{n.label}</text>
          <text x={n.x} y="194" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="10.5" fill={INK} opacity="0.6">{n.sub}</text>
        </g>
      ))}
    </svg>
  );
}

/** Cross-subject generalisation diagram: a model trained on known subjects is
 *  evaluated on one it never saw during training. */
export function GeneralisationDiagram() {
  return (
    <svg viewBox="0 0 640 220" width="100%" role="img" aria-labelledby="genDiagramTitle">
      <title id="genDiagramTitle">Diagram: known subjects train a model; the open question is whether it still works on an unknown subject</title>
      <text x="20" y="28" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="12" letterSpacing="0.06em" fill={INK} opacity="0.55">KNOWN SUBJECTS</text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 46},44)`}>
          <circle cx="14" cy="12" r="9" fill="none" stroke={SIGNAL} strokeWidth="2" />
          <path d="M2 40 Q14 22 26 40" fill="none" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <line x1="160" y1="60" x2="250" y2="60" stroke={LINE} strokeWidth="1.5" />
      <polygon points="247,56 247,64 260,60" fill={INK} opacity="0.5" />
      <text x="205" y="46" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="10.5" fill={INK} opacity="0.6">train</text>

      <g transform="translate(268,26)">
        <rect x="0" y="0" width="90" height="68" fill="none" stroke={INK} strokeWidth="1.4" />
        <text x="45" y="30" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="12" fill={INK}>MODEL</text>
        <text x="45" y="47" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="9.5" fill={INK} opacity="0.55">zero</text>
        <text x="45" y="59" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="9.5" fill={INK} opacity="0.55">calibration</text>
      </g>

      <line x1="358" y1="60" x2="448" y2="60" stroke={LINE} strokeWidth="1.5" />
      <polygon points="445,56 445,64 458,60" fill={CORAL} />
      <text x="403" y="46" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="10.5" fill={INK} opacity="0.6">evaluate on</text>

      <g transform="translate(466,44)">
        <circle cx="14" cy="12" r="9" fill="none" stroke={CORAL} strokeWidth="2" strokeDasharray="3 2.5" />
        <path d="M2 40 Q14 22 26 40" fill="none" stroke={CORAL} strokeWidth="2" strokeDasharray="3 2.5" strokeLinecap="round" />
      </g>
      <text x="466" y="28" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="12" letterSpacing="0.06em" fill={CORAL}>UNKNOWN</text>

      <line x1="20" y1="150" x2="620" y2="150" stroke={LINE} strokeWidth="1" strokeDasharray="1 4" />
      <text x="20" y="180" fontFamily="DM Serif Display" fontStyle="italic" fontSize="18" fill={INK}>Does it still work?</text>
      <text x="20" y="202" fontFamily="IBM Plex Sans" fontSize="11.5" fill={INK} opacity="0.62">This programme measures that, not accuracy on people the model already knows.</text>
    </svg>
  );
}

/** Six-stage research trajectory, read from researchStages in portfolio.ts.
 *  Nodes reveal progressively the first time the diagram scrolls into view (skipped entirely under prefers-reduced-motion). */
export function TrajectoryDiagram() {
  const n = researchStages.length;
  const width = 720;
  const stepX = (width - 80) / (n - 1);
  const ref = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { setRevealed(n); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          researchStages.forEach((_, i) => {
            setTimeout(() => setRevealed((r) => Math.max(r, i + 1)), i * 160);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [n]);

  return (
    <svg ref={ref} viewBox={`0 0 ${width} 190`} width="100%" role="img" aria-labelledby="trajDiagramTitle">
      <title id="trajDiagramTitle">Diagram: the six-stage research trajectory from measuring the problem to testing action</title>
      <line x1="40" y1="70" x2={width - 40} y2="70" stroke={LINE} strokeWidth="1.5" />
      {researchStages.map((s, i) => {
        const x = 40 + i * stepX;
        const isCore = i < 3;
        const isRevealed = i < revealed;
        return (
          <g key={s[0]} style={{ opacity: isRevealed ? 1 : 0, transform: isRevealed ? "translateY(0)" : "translateY(6px)", transition: "opacity 420ms ease, transform 420ms ease" }}>
            <circle cx={x} cy="70" r="6" fill={isCore ? SIGNAL : CORAL} />
            <text x={x} y="30" textAnchor="middle" fontFamily="DM Serif Display" fontStyle="italic" fontSize="15" fill={INK}>{s[1]}</text>
            <text x={x} y="14" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="10" letterSpacing="0.08em" fill={isCore ? SIGNAL_DEEP : CORAL} opacity="0.85">{s[0]}</text>
            <foreignObject x={x - stepX / 2 + 6} y="86" width={stepX - 12} height="95">
              <div style={{ fontFamily: "IBM Plex Sans", fontSize: "10.8px", lineHeight: 1.5, color: INK, opacity: 0.72, textAlign: "center" }}>{s[3]}</div>
            </foreignObject>
          </g>
        );
      })}
      <text x="40" y="185" fontFamily="IBM Plex Sans" fontSize="10" letterSpacing="0.05em" fill={SIGNAL_DEEP}>■ CORE — sEMG</text>
      <text x="160" y="185" fontFamily="IBM Plex Sans" fontSize="10" letterSpacing="0.05em" fill={CORAL}>■ EXTENSION — EEG, fusion, systems</text>
    </svg>
  );
}

/** Systems ecosystem map: how the four platforms and Human Motor Intelligence relate. */
export function SystemsMapDiagram() {
  const boxes = [
    { x: 20, y: 90, label: "MyoControl", sub: "analysis" },
    { x: 213, y: 90, label: "MyoAdapt", sub: "adaptation" },
    { x: 406, y: 90, label: "BioSignal-FM", sub: "representation" },
    { x: 599, y: 90, label: "MyoSim", sub: "simulation" },
  ];
  return (
    <svg viewBox="0 0 740 220" width="100%" role="img" aria-labelledby="sysMapTitle">
      <title id="sysMapTitle">Diagram: four independent platforms connected through the Human Motor Intelligence integration layer</title>
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width="121" height="56" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.5" />
          <text x={b.x + 60.5} y={b.y + 25} textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="12.5" fill={INK}>{b.label}</text>
          <text x={b.x + 60.5} y={b.y + 41} textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="9.5" fill={INK} opacity="0.55">{b.sub}</text>
          <line x1={b.x + 60.5} y1={b.y} x2={b.x + 60.5} y2="60" stroke={LINE} strokeWidth="1.4" />
        </g>
      ))}
      <line x1="80" y1="60" x2="660" y2="60" stroke={SIGNAL} strokeWidth="1.6" />
      <rect x="250" y="18" width="240" height="34" fill={PAPER} stroke={SIGNAL} strokeWidth="1.4" />
      <text x="370" y="40" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight={600} fontSize="12" letterSpacing="0.03em" fill={SIGNAL_DEEP}>HUMAN MOTOR INTELLIGENCE</text>
      <text x="370" y="190" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="10.5" fill={INK} opacity="0.6">shared contracts, provenance, and a reproducibility register</text>
    </svg>
  );
}
