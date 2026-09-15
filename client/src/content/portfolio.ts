/**
 * Qussai Adlbi — public research-portfolio content registry.
 * This file is the single source of truth for the site and the on-site CV.
 * Claims are matched to the actual manuscripts and governance records reviewed on 2026-09-01.
 * Update this file first; pages and the standalone CV are written to follow it.
 */
export type ClaimStatus =
  | "PUBLISHED"
  | "RELEASED"
  | "MANUSCRIPT_SUPERVISORY_REVIEW"
  | "MANUSCRIPT_SUBMITTED"
  | "MANUSCRIPT_FINALISATION"
  | "MANUSCRIPT_IN_PREPARATION"
  | "RESEARCH_IN_PROGRESS"
  | "PLANNED"
  | "RESEARCH_PROGRAMME"
  | "FUTURE_DIRECTION";

/** Separates status dimensions that a single badge conflates — used where the distinction actually matters. */
export type StatusBreakdown = {
  manuscript: string;
  supervisory: string;
  publication: string;
};

export type EvidenceLevel = "public" | "archived" | "manuscript" | "in_progress" | "future";

export type PublicLink = {
  label: string;
  href: string;
  kind: "repository" | "archive" | "demo" | "profile" | "download";
};

export type ResearchProject = {
  slug: string;
  order: string;
  track: "core" | "extension";
  title: string;
  shortTitle: string;
  status: ClaimStatus;
  evidenceLevel: EvidenceLevel;
  verificationState: "verified" | "archive_reviewed" | "user_confirmed" | "document_pending";
  lastVerified: string;
  question: string;
  background: string;
  method: string;
  evaluation: string;
  observation: string;
  interpretation: string;
  limitation: string;
  contribution: string[];
  next: string;
  publicLinks: PublicLink[];
  allowedClaims: string[];
  forbiddenClaims: string[];
  statusBreakdown?: StatusBreakdown;
};

export const profile = {
  name: "Qussai Adlbi",
  identity: "Biomedical Engineering Student & Emerging Researcher",
  shortFocus: "Reliable Biosignal-Based Motor-Intent Decoding",
  heroStatement:
    "I develop and evaluate biosignal-based methods for decoding motor intent across people a model has never seen.",
  longQuestion:
    "How can motor intent be decoded reliably from biosignals for individuals a model has not previously seen, and how can that evidence be translated responsibly into adaptive assistive systems?",
  currentFocus: "sEMG · EEG · BCI · Cross-Subject Generalisation · Reproducible Research",
  longTerm: "Neurotechnology · Adaptive Rehabilitation · Intelligent Surgical Robotics",
  email: "adlbiqussai@gmail.com",
  cityCountry: "Hama, Syria",
  cvDownload: "/cv/Qussai_Adlbi_Europass_CV.pdf",
};

export const profiles: PublicLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/qussai-adlbi-bme/", kind: "profile" },
  { label: "GitHub", href: "https://github.com/Qussai-BME", kind: "profile" },
  { label: "ORCID", href: "https://orcid.org/0009-0000-7667-1992", kind: "profile" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=nKaW0H4AAAAJ&hl=en", kind: "profile" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Qussai-Adlbi", kind: "profile" },
];

export const statusMeta: Record<ClaimStatus, { label: string; tone: "review" | "open" | "gate" | "validated" }> = {
  PUBLISHED: { label: "Published", tone: "validated" },
  RELEASED: { label: "Released", tone: "open" },
  MANUSCRIPT_SUPERVISORY_REVIEW: { label: "Manuscript — Supervisory Review", tone: "review" },
  MANUSCRIPT_SUBMITTED: { label: "Manuscript — Submitted, Under Journal Review", tone: "review" },
  MANUSCRIPT_FINALISATION: { label: "Manuscript — Finalisation", tone: "review" },
  MANUSCRIPT_IN_PREPARATION: { label: "Manuscript — In Preparation", tone: "review" },
  RESEARCH_IN_PROGRESS: { label: "Research in Progress", tone: "gate" },
  PLANNED: { label: "Planned — Dependent on Paper 3", tone: "gate" },
  RESEARCH_PROGRAMME: { label: "Research Programme", tone: "validated" },
  FUTURE_DIRECTION: { label: "Future Direction", tone: "gate" },
};

export const researchProjects: ResearchProject[] = [
  {
    slug: "metric-integrity",
    order: "01",
    track: "core",
    title: "Rest-Class Metric Inflation in Zero-Calibration Cross-Subject sEMG: A Three-Database LOSO Benchmark Across Intact-Limb and Transradial Amputee Populations",
    shortTitle: "Metric Integrity",
    status: "MANUSCRIPT_SUBMITTED",
    evidenceLevel: "manuscript",
    verificationState: "user_confirmed",
    lastVerified: "2026-09-10",
    question: "Can a headline accuracy figure overstate how well a cross-subject sEMG model actually decodes motor intent, once rest-class prevalence is taken into account — and does this hold across intact-limb and amputee populations alike?",
    background: "Cross-subject sEMG benchmarks are usually reported as one aggregate accuracy number, and leave-one-subject-out evaluation appears in under 10% of published sEMG studies. If most evaluation windows are a rest posture rather than an active gesture, a model can look strong overall while barely working on the gestures that matter for prosthetic control. This study is the first simultaneous LOSO benchmark spanning intact-limb and transradial amputee populations together.",
    method: "Strict leave-one-subject-out cross-validation of a 420-dimensional hand-crafted feature set (from 678 raw features via training-fold SelectKBest) across three NinaPro databases — DB2 (n=40, intact-limb), DB3 (n=11, transradial amputees), DB7 (n=22, mixed) — with four classical classifiers and a naive CNN-1D baseline, on CPU, with zero subject-specific calibration.",
    evaluation: "73 subjects across three populations; Friedman omnibus tests, Nemenyi post-hoc, Cohen's d, and SHAP-based feature attribution, all computed from training subjects only.",
    observation: "XGBoost reached 65.96% accuracy but only 27.14% macro-F1 on DB7, 54.64%/21.89% on DB2, and 43.46%/4.01% on DB3 — active-gesture recognition is far weaker than the aggregate number suggests. A naive end-to-end CNN-1D baseline, with no transfer learning or pretraining, trailed by 38–44 percentage points, showing that hand-crafted features carry most of the transferable signal in this setting. SHAP analysis identifies amplitude-distribution features as the dominant cross-subject discriminators across all three populations.",
    interpretation: "An aggregate accuracy figure is not, by itself, a claim about robust motor-intent decoding — the DB3 gap (43.46% accuracy vs. 4.01% macro-F1) is among the largest reported in this literature. Before comparing adaptation methods or new architectures, the benchmark itself has to report the number that reflects control-relevant performance.",
    limitation: "This is a computational evaluation across three databases, run under one fixed protocol. It doesn't establish clinical validity, doesn't show that hand-crafted features generally beat deep learning, and doesn't generalise to rest-class prevalence beyond these three cohorts.",
    contribution: ["Designed and implemented the strict LOSO benchmark across three NinaPro databases (73 subjects)", "Documented the accuracy–macro-F1 divergence explicitly for transradial amputees for the first time", "Ran cross-database SHAP analysis identifying subject-invariant feature groups", "Archived the pipeline as open, reproducible research software"],
    next: "Submitted to a peer-reviewed journal; awaiting editorial decision.",
    publicLinks: [
      { label: "GitHub repository", href: "https://github.com/Qussai-BME/sEMG-Zero-Calibration-LOSO-Benchmark", kind: "repository" },
      { label: "Zenodo archive", href: "https://zenodo.org/records/21940345", kind: "archive" },
    ],
    allowedClaims: ["Archived strict LOSO benchmark", "Manuscript submitted, under journal review", "Protocol-specific metric-integrity finding across three databases"],
    forbiddenClaims: ["Published paper", "Accepted manuscript", "Peer-reviewed", "Clinical validation", "General claim against deep learning"],
  },
  {
    slug: "minirocket-domain-shift",
    order: "02",
    track: "core",
    title: "Cross-Subject sEMG Gesture Recognition with MiniROCKET: A Mechanistic Analysis of Domain Adaptation Failure",
    shortTitle: "Domain-Shift Mechanism",
    status: "MANUSCRIPT_SUPERVISORY_REVIEW",
    evidenceLevel: "manuscript",
    verificationState: "verified",
    lastVerified: "2026-09-03",
    question: "Why do standard feature-space domain-adaptation methods fail to close the cross-subject gap in sEMG gesture recognition — is that a fixable optimisation issue, or a structural one?",
    background: "A negative result from a domain-adaptation method is usually read as 'the method didn't work.' This study asks a sharper question: does the failure trace to how the method was tuned, or to a mismatch between the method's assumptions and the structure of the representation it operates on.",
    method: "MiniROCKET (a fast random-convolutional-kernel time-series classifier) evaluated with five feature-space treatments — no adaptation, centering, CORAL, TCA, and Subspace Alignment — under strict LOSO across NinaPro DB2, DB3, and DB7 (15 conditions, 365 subject-level folds), with a diagnostic covariance-eigenvalue analysis.",
    evaluation: "Within-subject vs. cross-subject accuracy on the identical pipeline, Wilcoxon signed-rank tests, Cohen's d, and domain-shift distance metrics before and after each adaptation method.",
    observation: "Without adaptation, LOSO accuracy collapses to 9.15% (DB7), 13.08% (DB2), and 6.63% (DB3, statistically indistinguishable from chance) — a 4–6× drop from within-subject accuracy on the identical pipeline (Cohen's d ≥ 2.96 on all three). None of the four adaptation methods improved on the unadapted baseline; CORAL specifically degraded accuracy (d = 0.92 on DB7, 1.11 on DB2) by amplifying noise along near-singular directions of the feature covariance (condition number ≈ 9.5×10¹¹; 97.2% of eigenvalues below the regularisation floor).",
    interpretation: "This is a representation problem before it is an algorithm problem: a linear covariance-alignment step applied to a highly redundant, near-singular feature space is structurally incompatible with it, not merely under-tuned. Closing the gap needs either explicit kernel-redundancy reduction or a different representation — which is exactly what Paper 3 tests.",
    limitation: "The conclusion concerns the tested representation (MiniROCKET PPV), methods, and datasets. It is not a general statement that domain adaptation fails, and DB3 shows no significant inter-condition differences at all — every method clusters near chance there.",
    contribution: ["Designed the five-condition, three-database domain-adaptation comparison (365 LOSO folds)", "Diagnosed the covariance/redundancy mechanism behind CORAL's failure via eigenvalue analysis", "Turned a negative result into three specific, falsifiable next experiments", "Archived the analysis pipeline as open research software"],
    next: "With my supervisor, for review before journal submission.",
    publicLinks: [
      { label: "GitHub repository", href: "https://github.com/Qussai-BME/MiniROCKET-sEMG-CrossSubject-DomainAdaptation", kind: "repository" },
      { label: "Zenodo archive", href: "https://zenodo.org/records/21940501", kind: "archive" },
    ],
    allowedClaims: ["Archived negative-result analysis", "Manuscript in finalisation", "Representation–adaptation interaction under strict LOSO, 365 folds"],
    forbiddenClaims: ["Peer-reviewed publication", "Universal adaptation conclusion", "State-of-the-art result"],
  },
  {
    slug: "lite-dan",
    order: "03",
    track: "core",
    title: "Lite-DAN: Learned Invariance for Cross-Subject sEMG",
    shortTitle: "Learned Invariance",
    status: "RESEARCH_IN_PROGRESS",
    evidenceLevel: "in_progress",
    verificationState: "user_confirmed",
    lastVerified: "2026-09-01",
    question: "Can a lightweight domain-adversarial encoder learn a subject-invariant sEMG representation that linear feature alignment could not — under a protocol locked before any result is seen?",
    background: "Paper 2 shows that aligning an existing feature space is not enough. The direct next test is whether a small, jointly learned encoder — trained to predict the gesture while staying uninformative about the source subject — can do better, without collapsing into subject-specific shortcuts.",
    method: "A shared encoder, gesture classifier, and gradient-reversal domain classifier, evaluated under the same strict LOSO, zero-target-label protocol as Papers 1 and 2, against LDA, Random Forest, and XGBoost baselines, with gradual vs. fixed adversarial-weight scheduling as a pre-specified ablation.",
    evaluation: "Full evaluation is planned across NinaPro DB7, DB2, and DB3; DB7 preparation is complete. No hyperparameter is ever selected using the held-out subject.",
    observation: "Early diagnostic runs on DB7 show the encoder learns a real, non-trivial representation rather than a degenerate shortcut, but this is diagnostic-stage evidence, not a locked evaluation result.",
    interpretation: "The rule for this paper is explicit: don't chase a target number. The protocol is locked before results are read, and the DB2/DB3 evaluation and pre-specified statistical comparison are what will actually decide whether learned invariance beats classical alignment — not the direction of an early diagnostic.",
    limitation: "Research in progress. No comparative-performance, publication, or effectiveness claim is authorised until the full DB2/DB3/DB7 evaluation and statistical analysis are complete.",
    contribution: ["Designed the Lite-DAN architecture and the locked evaluation protocol", "Completed DB7 data preparation and diagnostic verification", "Maintains the shared LOSO / feature-selection infrastructure built for Paper 1", "Currently extending evaluation to DB2 and DB3"],
    next: "Complete the full DB2/DB3/DB7 evaluation and the pre-registered statistical comparison.",
    publicLinks: [
      { label: "MyoAdapt repository", href: "https://github.com/Qussai-BME/MyoAdapt", kind: "repository" },
      { label: "MyoAdapt Zenodo archive", href: "https://zenodo.org/records/22096284", kind: "archive" },
      { label: "MyoAdapt live link", href: "https://myoadapt-qussai-bme.streamlit.app/", kind: "demo" },
    ],
    allowedClaims: ["Research in progress", "Protocol-locked learned-invariance direction", "DB7 preparation complete"],
    forbiddenClaims: ["Final performance", "Accepted paper", "Improved robustness", "Validated model"],
  },
  {
    slug: "eeg-evaluation",
    order: "04",
    track: "extension",
    title: "Strict Zero-Calibration Cross-Subject EEG Motor-Imagery Decoding: A Harmonized External Validation Study on OpenBMI",
    shortTitle: "EEG Extension",
    status: "MANUSCRIPT_SUPERVISORY_REVIEW",
    evidenceLevel: "manuscript",
    verificationState: "verified",
    lastVerified: "2026-09-06",
    question: "Does the zero-calibration, subject-held-out discipline built for sEMG hold up when applied to a different biosignal — EEG motor imagery — on an independent public cohort, and precisely which effect sizes can a study this size actually confirm?",
    background: "The sEMG series is protocol-specific by design. Testing whether the same measurement discipline transfers to EEG is a direct test of whether the underlying methodology, not just the sEMG use case, is sound. Published zero-calibration BCI claims are often hard to compare because studies rarely report what their sample size could and could not detect — this study adds that account explicitly.",
    method: "A harmonized external validation on 54 OpenBMI participants (NEMAR derivative nm000338), binary left/right-hand motor imagery, evaluating five predeclared zero-calibration decoders — linear, LDA, linear-SVM, spectral logistic regression, and a compact CNN — under strict LOSO with no target-subject calibration, fitting, or selection.",
    evaluation: "Held-out-subject macro-F1 as the primary endpoint; a Friedman omnibus test with Holm-adjusted pairwise contrasts; standardized effect sizes and a minimum-detectable-effect (power) analysis for every contrast; an exploratory temporal-vs-spectral-vs-covariance representation audit; two independent reproducibility layers (byte-identical rerun and independently coded statistical recomputation).",
    observation: "Mean macro-F1 ranged from 0.596 to 0.636 across the five decoders. The Friedman omnibus test was significant, but none of the ten pairwise comparisons survived Holm correction, and every observed effect size fell below what the design could confirm at 80% power — a genuinely underpowered comparison, not evidence of equivalence. In an exploratory representation audit, temporal features significantly exceeded spectral features (Holm-adjusted p = 0.000749, a real, moderate effect). A separate covariance-based (log-Euclidean) implementation was independently audited at the trial level and found to exhibit single-class prediction collapse in 76% of subjects — a diagnosed implementation bug, caught before it could be misreported as a finding about covariance representations, not evidence about them either way.",
    interpretation: "The honest result here is two-layered: a validated, reproducible external benchmark with an explicit account of what it could and couldn't detect, plus a smaller, real temporal-over-spectral effect. Catching the covariance arm's defect through independent trial-level inspection — rather than trusting a summary macro-F1 — is itself evidence for the value of the reproducibility discipline this programme insists on everywhere.",
    limitation: "This is an external validation on the 54-subject OpenBMI cohort, run under one fixed protocol. It isn't a clinical BCI result, and it isn't a BCI Competition IV-2a replication. The representation audit only supports a temporal-over-spectral preference; the covariance implementation still needs correcting and rerunning before it can support any claim at all.",
    contribution: ["Designed the cross-modality replication of the sEMG evaluation protocol for EEG", "Executed the 54-subject external validation across five predeclared decoders with full multiplicity-corrected inference", "Added a standardized-effect-size and minimum-detectable-effect analysis to distinguish 'no difference' from 'underpowered to detect a difference'", "Diagnosed a degenerate classifier fit in the covariance arm via independent trial-level audit before it could be misreported", "Verified reproducibility via a byte-identical rerun and an independently coded statistical recomputation"],
    next: "Currently with my supervisor ahead of picking a submission journal.",
    publicLinks: [],
    allowedClaims: ["Reproducible 54-subject external EEG validation with power analysis", "Temporal-over-spectral representation finding", "All validation gates passed, two independent reproducibility layers"],
    forbiddenClaims: ["Published EEG paper", "Clinical BCI validation", "Statistically supported best decoder", "BCI Competition IV-2a replication", "Covariance-representation comparison claim"],
    statusBreakdown: { manuscript: "Complete", supervisory: "Under review", publication: "Not yet submitted" },
  },
  {
    slug: "transparent-eeg-emg-fusion",
    order: "05",
    track: "extension",
    title: "Transparent Cross-Subject EEG–EMG Fusion in Motor Imagery: An Amended External Validation on Jeong2020",
    shortTitle: "Multimodal Fusion",
    status: "MANUSCRIPT_SUPERVISORY_REVIEW",
    evidenceLevel: "manuscript",
    verificationState: "verified",
    lastVerified: "2026-09-06",
    question: "Does combining EEG and EMG under a transparent fusion rule improve motor-imagery decoding over EEG alone, and — separately — does fusion protect performance when EEG signal quality degrades?",
    background: "EEG–EMG fusion is often motivated by the assumption that two complementary signals must outperform either one alone. Under strict subject-independent decoding that assumption needs explicit testing, paired with an honest account of what a 24-subject design can and cannot confirm either way.",
    method: "Four predeclared LDA-based conditions — EEG-only, EMG-only, early fusion, late fusion — evaluated under strict LOSO on an amended 24-subject, all-11-class motor-imagery cohort (Jeong et al., 2020, after excluding one subject with a missing acquisition), plus an exploratory graded EEG/EMG feature-dropout analysis tracking each condition's own predicted-class confidence alongside its actual accuracy.",
    evaluation: "Held-out-subject macro-F1 as the primary endpoint; Friedman's test with Holm-adjusted contrasts; standardized effect sizes with a minimum-detectable-effect analysis for every contrast; paired robustness comparisons under 10%/20% feature dropout; an independent, byte-identical rerun plus an independently coded statistical recomputation.",
    observation: "Mean macro-F1 was 0.081 (EEG-only), 0.048 (EMG-only), 0.075 (early fusion), and 0.081 (late fusion). EEG-only, early fusion, and late fusion each exceeded EMG-only after Holm correction — a large, well-powered effect. Neither fusion condition exceeded EEG-only, but the power analysis shows this specific comparison is genuinely inconclusive at this sample size, not a confirmed absence of benefit. Under simulated EEG feature dropout, every fusion variant degraded in lockstep with EEG-only, offering no protection — and the EEG branch's own predicted-class confidence rose from 0.09 (clean) to 0.95 (20% dropout) even as its actual macro-F1 collapsed from 0.081 to 0.017, a striking confidence–accuracy miscalibration in the wrong direction.",
    interpretation: "Two distinct, well-supported findings, kept separate: EMG-only is confirmed weaker than EEG-only or fusion (well-powered), while EEG-versus-fusion remains genuinely undetermined (underpowered, not disproved). The degradation analysis adds an independent result: a confidence-based fusion gate would become more committed to EEG exactly as EEG becomes unreliable — a miscalibration of the confidence signal itself, not a working robustness mechanism. This is treated as an external validation on one available synchronised cohort, not pooled with any other EEG–EMG source.",
    limitation: "This is a single-cohort, protocol-specific finding using transparent (non-learned) fusion rules. It does not prove fusion is generally ineffective, does not extend to learned or hierarchical fusion methods or other datasets, and the dropout analysis is exploratory and non-predeclared.",
    contribution: ["Defined the four-condition fusion comparison under the programme's strict LOSO discipline", "Added standardized effect sizes and a minimum-detectable-effect analysis distinguishing confirmed from inconclusive contrasts", "Designed and ran the graded feature-dropout robustness analysis and discovered the confidence–accuracy miscalibration", "Verified the result with a byte-identical rerun and an independently coded statistical recomputation"],
    next: "My supervisor is reviewing it before we settle on where to submit.",
    publicLinks: [],
    allowedClaims: ["24-subject external fusion validation with power analysis", "Confirmed EMG-only deficit; inconclusive (not disproved) EEG-vs-fusion result", "Confidence–accuracy miscalibration finding under EEG degradation", "All validation gates passed"],
    forbiddenClaims: ["Fusion is generally ineffective or effective", "Cross-cohort validated result", "EEG–EMG mechanism", "Clinical result"],
    statusBreakdown: { manuscript: "Complete", supervisory: "Under review", publication: "Not yet submitted" },
  },
  {
    slug: "initial-state-robustness",
    order: "06",
    track: "extension",
    title: "Reproducibility and Provenance in Simulated Intent-to-Action Control",
    shortTitle: "Systems Evidence",
    status: "PLANNED",
    evidenceLevel: "in_progress",
    verificationState: "verified",
    lastVerified: "2026-09-06",
    question: "Are simulated pick-and-place outcomes robust to a controlled initial-state factor, and can decoder quality be compared responsibly when a replay trace's origin cannot be authenticated?",
    background: "Task-level outcomes — success, latency, endpoint error — carry information that decoding accuracy alone cannot supply. But a repeated-trials study is only meaningful if the replay inputs are genuinely traceable to a known source; otherwise a clean-looking result can be an artefact of an unverifiable fixture rather than a real finding.",
    method: "MyoSim was extended with a seeded initial-state perturbation capability and run across 20 pre-specified bounded initial states in a pick-and-place task, with a replay-provenance audit performed before any decoder-quality comparison was attempted.",
    evaluation: "Wilson intervals for success/failure and bootstrap intervals for continuous endpoints, with an independent byte-identical rerun.",
    observation: "The bounded simulation fixture failed to complete the task across all 20 declared perturbed initial states, and the subsequent provenance audit found that the available replay trace could not be authenticated as originating from a specific, known decoder — so the planned decoder-quality comparison was stopped rather than run on an unverifiable input.",
    interpretation: "Refusing to compare decoder quality on an unverifiable trace is the correct scientific call, not a null result — the alternative would be reporting a comparison that looks rigorous but is not. A three-condition decoder-quality extension, analysed with Cochran's Q, is designed to close exactly this gap once verified traces are available.",
    limitation: "This is non-clinical, simulation-only systems evidence. It does not represent a real-decoder performance comparison, physical-device behaviour, or a clinical or biomedical outcome.",
    contribution: ["Extended MyoSim with seeded, reproducible initial-state perturbation", "Designed and ran the 20-state stress test with an independent byte-identical rerun", "Built and applied the provenance audit that caught the authentication gap before it became a false comparison", "Currently extending the design to three verified decoder-quality conditions"],
    next: "Blocked on verified decoder traces, expected once Paper 3 (Lite-DAN) reaches a locked result; will then run the three-condition decoder-quality extension with Cochran's Q analysis.",
    publicLinks: [
      { label: "MyoSim repository", href: "https://github.com/Qussai-BME/MyoSim", kind: "repository" },
      { label: "MyoSim Zenodo archive", href: "https://zenodo.org/records/22282345", kind: "archive" },
      { label: "MyoSim live link", href: "https://myosim-qussai-bme.streamlit.app/", kind: "demo" },
    ],
    allowedClaims: ["Reproducible bounded simulation stress test", "Decoder-quality comparison paused pending authenticated trace provenance", "Non-clinical systems evidence"],
    forbiddenClaims: ["Decoder quality does not matter", "Real-decoder control result", "Physical device robustness", "Clinical or biomedical outcome"],
  },
];

export const softwareResources = [
  {
    id: "benchmark",
    title: "sEMG Zero-Calibration LOSO Benchmark",
    role: "Measurement / evaluation layer",
    status: "RELEASED" as ClaimStatus,
    description: "Open archived benchmark software for strict cross-subject, zero-calibration sEMG evaluation across three NinaPro databases.",
    links: researchProjects[0].publicLinks,
  },
  {
    id: "minirocket",
    title: "MiniROCKET Cross-Subject Domain Adaptation",
    role: "Representation / domain-shift analysis layer",
    status: "RELEASED" as ClaimStatus,
    description: "Open archived code and analysis resource associated with the MiniROCKET mechanistic study.",
    links: researchProjects[1].publicLinks,
  },
  {
    id: "myocontrol",
    title: "MyoControl",
    role: "Reproducible analysis / explainability workflow",
    status: "RELEASED" as ClaimStatus,
    description: "Inspectable EMG analysis and control-support platform; public research software, not clinical-ready software.",
    links: [
      { label: "Repository", href: "https://github.com/Qussai-BME/myocontrol", kind: "repository" as const },
      { label: "Zenodo archive", href: "https://zenodo.org/records/21940052", kind: "archive" as const },
      { label: "Live link", href: "https://myocontrol-qussai-bme.streamlit.app/", kind: "demo" as const },
    ],
  },
  {
    id: "myoadapt",
    title: "MyoAdapt",
    role: "Cross-subject adaptation infrastructure",
    status: "RELEASED" as ClaimStatus,
    description: "Open research-use infrastructure for cross-subject sEMG experiments and reproducible evaluation; not a medical device.",
    links: researchProjects[2].publicLinks,
  },
  {
    id: "myosim",
    title: "MyoSim",
    version: "v0.1.5.3",
    role: "Non-clinical simulation and provenance environment",
    status: "RELEASED" as ClaimStatus,
    description: "Open non-clinical research demonstrator for deterministic intent replay and simulated action.",
    links: [
      { label: "Repository", href: "https://github.com/Qussai-BME/MyoSim", kind: "repository" as const },
      { label: "Zenodo archive", href: "https://zenodo.org/records/22282345", kind: "archive" as const },
      { label: "Live link", href: "https://myosim-qussai-bme.streamlit.app/", kind: "demo" as const },
    ],
  },
  {
    id: "biosignal-fm",
    title: "BioSignal-FM",
    version: "v4.0.3.1",
    role: "Long-horizon representation-learning infrastructure",
    status: "RELEASED" as ClaimStatus,
    description: "Open architecture and analysis framework for surface-biosignal representation learning; proposed transfer hypotheses remain unvalidated.",
    links: [
      { label: "Repository", href: "https://github.com/Qussai-BME/BioSignal-FM", kind: "repository" as const },
      { label: "Zenodo archive", href: "https://zenodo.org/records/22276347", kind: "archive" as const },
      { label: "Live link", href: "https://biosignal-fm-qussai-bme.streamlit.app/", kind: "demo" as const },
    ],
  },
];

export const researchStages = [
  ["01", "Measure", "Expose what an aggregate score hides.", "Metric integrity across three sEMG populations."],
  ["02", "Understand", "Explain the mechanism behind an adaptation failure, rather than hide it.", "Eigenvalue-level diagnosis of why CORAL fails on MiniROCKET features."],
  ["03", "Test", "Investigate learned invariance under a protocol locked before any result is seen.", "Lite-DAN, DB7 prepared, full evaluation in progress."],
  ["04", "Extend", "Test whether the same discipline — and an honest account of statistical power — transfers to a new modality.", "54-subject external EEG validation; a real temporal-over-spectral effect, and a bug caught before it became a false finding."],
  ["05", "Compare", "Test whether combining modalities earns its added complexity, clean or degraded.", "Transparent EEG–EMG fusion; a degradation test that also surfaced a confidence-miscalibration finding."],
  ["06", "Trace", "Test how evidence survives the handoff from decoder to system.", "Simulation stress-testing and a replay-provenance audit that caught a real gap."],
] as const;

export const methodTerms = [
  ["LOSO-CV", "Leave-one-subject-out cross-validation: one participant is held out entirely while fitting uses the remaining participants. Used in under 10% of published sEMG studies, despite testing the exact condition a new user represents."],
  ["Target-free pipeline", "The held-out participant contributes no scaler fitting, feature selection, model fitting, model choice, or calibration data. This is what makes 'zero calibration' a meaningful claim rather than a slogan."],
  ["Macro-F1", "A class-balanced summary that gives every class equal weight — the metric that exposes rest-class dominance, which raw accuracy conceals."],
  ["Domain shift", "The distributional change between people, sessions, sensors, or conditions that makes a model trained on one group harder to transfer to another."],
  ["Representation", "The feature space a model receives. Papers 2 and 4 both find that what the representation preserves matters more than which classifier reads it."],
  ["Condition number", "A measure of how near-singular a feature covariance matrix is. A condition number of 9.5×10¹¹ in Paper 2 is why CORAL's whitening step amplified noise instead of aligning subjects."],
  ["Holm correction", "A multiple-comparison procedure applied after paired tests, so a set of contrasts is not misread as several independent discoveries — the reason a significant omnibus test in Papers 4 and 5 does not automatically mean any one pairwise result is supported."],
  ["Minimum detectable effect", "The smallest true effect a study's sample size could reliably confirm. Papers 4 and 5 report this alongside every null result, so 'not significant' is honestly split into 'confirmed no difference' versus 'this design couldn't have detected it either way.'"],
  ["Byte-identical rerun", "An independent re-execution that reproduces an output file exactly — reproducibility evidence, not an additional data point."],
  ["Provenance check", "A verification step confirming that a required input's origin can be authenticated. When it can't, the correct response is to stop and say so, not to proceed on a convenient assumption."],
] as const;

export const education: { date: string; title: string; institution: string; description: string; coursework?: string[] }[] = [
  {
    date: "Expected September 2027",
    title: "B.Sc. Biomedical Engineering",
    institution: "Al-Andalus University for Medical Sciences, Tartus, Syria",
    description: "Current undergraduate programme. Official transcript, ECTS record, and expected-graduation documentation will be added when supplied.",
  },
  {
    date: "2025–2026",
    title: "Erasmus+ Academic Study Mobility",
    institution: "Pázmány Péter Catholic University, Budapest, Hungary",
    description: "Completed an academic study mobility term (2025/26/1 International Program), with English as the language of instruction.",
    coursework: [
      "Introduction to Artificial Intelligence",
      "Neural Interfaces and Prostheses",
      "Sensor Technologies and Biological Sensing — full mark",
    ],
  },
];

export const technicalCategories = [
  ["Biosignal Analysis", "sEMG · EEG · preprocessing · signal-quality assessment · feature extraction · time-window analysis · subject-level evaluation · motor-intent classification"],
  ["Machine Learning", "Python · scikit-learn · experimental design · cross-validation · domain-shift analysis · representation analysis · explainability (SHAP)"],
  ["Research Engineering", "reproducibility · provenance · experiment design · protocol documentation · research-software architecture · technical writing"],
  ["Biomedical Engineering", "biosensors · instrumentation · biomedical signal acquisition · CAD · SolidWorks · AutoCAD · FEA fundamentals"],
];

export const futureDirections = [
  ["BCI & Neurotechnology", "I evaluate strict EEG motor-imagery protocols as groundwork for noninvasive BCI research — a direction I'm exploring, not a clinical system I'm building."],
  ["Adaptive Rehabilitation", "I study how reliable, subject-aware intent inference can support adaptive rehabilitation research, without converting computational evidence into a patient-benefit claim."],
  ["Intelligent Surgical Robotics", "I develop evidence-bounded computational models of surgeon-centred human–robot collaboration and state inference, as explored in SurgIntent. No physical robot, surgical control, or patient-safety claim is made."],
];

export const humanMotorIntelligence = {
  status: "RESEARCH_PROGRAMME" as ClaimStatus,
  title: "Human Motor Intelligence",
  description: "Human Motor Intelligence is the research programme behind this site: reliable, cross-subject motor-intent decoding across sEMG, EEG, multimodal fusion, and simulated systems. Four platforms — BioSignal-FM, MyoAdapt, MyoControl, and MyoSim — handle measurement, adaptation, reproducibility, and simulation, and they share a common set of contracts and a public log of known limitations so nothing here overstates what's actually been shown.",
  programmeStatus: "Ongoing. A multi-year research programme spanning cross-subject sEMG, EEG, multimodal fusion, and simulated systems — Papers 1 through 6.",
  publicReleaseStatus: "Released — v1.0.0. This release packages the governed integration layer itself: shared contracts and adapters, provenance manifests, a public scientific-limitations register, and a reproducible MyoSim demonstrator.",
  publicReleaseScope: "This release covers infrastructure and the P4/P5 evidence packaging described on this site. Paper 3 and authenticated Paper 6 decoder traces follow once Paper 3 reaches a locked result.",
  boundary: "The integrated demonstrator runs entirely on synthetic, deterministic fixtures. It's a systems-integration layer for testing how the pieces connect, not a live biosignal benchmark, a decoder-validation result, or anything clinical or commercial.",
  links: [
    { label: "GitHub repository", href: "https://github.com/Qussai-BME/Human-Motor-Intelligence", kind: "repository" as const },
    { label: "Zenodo archive", href: "https://zenodo.org/records/22288272", kind: "archive" as const },
  ],
};

export const engineeringProjects = [
  {
    title: "Muscle-Tension Measurement Device",
    type: "University Applied Engineering Project",
    status: "Completed · delivered to the university · graded 91% (Excellent)",
    description: "I co-designed and built a non-invasive surface-EMG muscle-tension measurement device: Ag/AgCl electrodes, an AD620 instrumentation amplifier, a 450 Hz Sallen–Key low-pass filter, a 50 Hz notch filter, envelope extraction, Arduino Uno acquisition at 1 kHz, and a Python interface computing RMS, MAV, and peak amplitude. Completed and delivered as a full applied project, with a final grade of 91%.",
    boundary: "A completed applied coursework project — the grade reflects the delivered device and documentation, not a validated clinical or diagnostic instrument.",
  },
  {
    title: "SurgIntent: Intent-Driven Surgical Robotics",
    type: "Graduation Thesis Project — 2026/2027",
    status: "Ongoing / Formal Defense Pending",
    publicRelease: "Later — after the formal defense",
    homeSummary: "My graduation thesis, in progress: testing whether subject-held-out human-state inference can drive a deterministic authorisation policy, across three separately evidenced research contexts. Full detail on the CV.",
    description: "My official graduation thesis, currently in progress and expanding: a computational study of whether subject-held-out human-state inference can be connected to a deterministic, robotic-style authorisation policy under explicit uncertainty rules. Substantial groundwork is already in place across three deliberately unpooled research contexts. Context A — a matched multimodal source-state-proxy study on 12 participants (WAY-EEG-GAL, 3,486 trials) — currently reaches a mean outer balanced accuracy of 0.586 and macro-F1 of 0.555 under audited, subject-held-out nested model selection. Context B — a surgical-context, EEG-only comparator study (PhysioNet robotic-assisted-surgery task) — has so far found that Ridge and CNN models do not outperform a constant-prediction baseline, a bounded negative result rather than a competence claim. Context C — a deterministic software policy layer replayed on held-out probabilities — currently produces zero modelled false activations at the cost of zero completed task episodes, a software trade-off still being worked through. A full thesis draft and defense-preparation materials are in hand, with the work continuing ahead of a scheduled defense.",
    boundary: "This thesis is still in progress, so read everything here as a running account, not a finished result. It isn't a clinical device, a physical robot, a surgical controller, a live biosignal demonstration, or anything that replaces a surgeon. Contexts A, B, and C stay unpooled on purpose, and the public release follows the formal defense.",
  },
] as const;
