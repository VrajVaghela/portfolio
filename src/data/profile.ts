export const profile = {
  name: "Vraj Vaghela",
  role: "AI systems engineer",
  location: "Surat, India",
  timezone: "Asia/Kolkata",
  email: "vrjvghl@gmail.com",
  phone: "+91 96012 81995",
  github: "https://github.com/VrajVaghela",
  githubUser: "VrajVaghela",
  linkedin: "https://www.linkedin.com/in/vraj-vaghela-950219237/",
  resume: "/assets/vraj-resume.pdf",
};

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  points: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  href: string;
  chart?: "models";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "self-rag",
    index: "01",
    title: "Self-RAG",
    kicker: "Self-reflective retrieval",
    year: "2026",
    summary:
      "A retrieval pipeline that decides whether to retrieve at all, then critiques its own answer before it speaks.",
    points: [
      "LangGraph orchestrates retrieve, relevance and support-verification nodes ([Retrieve], [IsSup], [IsUse]).",
      "PDFs chunked into a FAISS store with HuggingFace embeddings.",
      "A grounding check refuses unsupported answers instead of hallucinating them.",
    ],
    metrics: [
      { value: "100%", label: "accuracy on out-of-scope queries, vs 0% for always-retrieve RAG" },
      { value: "~8×", label: "latency, knowingly traded for answers verified against the source" },
    ],
    stack: ["Python", "LangGraph", "LangChain", "FAISS", "HuggingFace", "Pydantic"],
    href: "https://github.com/VrajVaghela/selfrag",
  },
  {
    id: "medfl",
    index: "02",
    title: "MedFL",
    kicker: "Privacy-preserving federated learning",
    year: "2026",
    summary:
      "One shared model trained across hospital nodes, without a single patient record leaving the hospital.",
    points: [
      "Built the aggregation service: ISH-weighted aggregation using Earth Mover's Distance to score how representative each node's data is.",
      "Combined with FedProx to contain drift from non-IID clinical data.",
      "Upweighted the most representative hospital to 42% vs ~29% for the others, beating sample-count FedAvg.",
    ],
    metrics: [
      { value: "97.22%", label: "global accuracy after 5 federated rounds" },
      { value: "75.69%", label: "where round one started" },
    ],
    stack: ["Python", "PyTorch", "Docker", "Federated Learning"],
    href: "https://github.com/Dhruvi-Rana09/MedFL",
  },
  {
    id: "sirn",
    index: "03",
    title: "Sirn",
    kicker: "Stockout prediction & inventory transfer",
    year: "2025",
    summary:
      "Demand forecasting joined to an engine that moves surplus stock to the stores about to run out. Top 11 at Walmart Sparkathon 2025.",
    points: [
      "Benchmarked Random Forest, XGBoost and LightGBM on 421,570 Walmart sales rows with a 17-feature pipeline, tested on 84,314 held-out rows.",
      "Shipped LightGBM: 0.29 MB against Random Forest's 2.92 GB.",
      "SARIMA with 52-week walk-forward validation reached 89.86% forecast accuracy (10.14% MAPE).",
      "Transfers matched by Haversine distance and a cost-effectiveness score.",
    ],
    metrics: [
      { value: "97.52%", label: "R² with Random Forest" },
      { value: "Top 11", label: "of 7,000+ participants, Walmart Sparkathon" },
    ],
    stack: ["React", "TypeScript", "Supabase", "Python", "scikit-learn"],
    href: "https://github.com/NityaSingh77/Sparkathon",
    chart: "models",
  },
];

export const modelBenchmarks = [
  { model: "Random Forest", r2: 97.52 },
  { model: "XGBoost", r2: 95.88 },
  { model: "LightGBM", r2: 90.89 },
];

export interface IndexProject {
  title: string;
  kind: string;
  year: string;
  blurb: string;
  stack: string;
  href: string;
  tone: string;
}

export const projectIndex: IndexProject[] = [
  {
    title: "CrimeOS",
    kind: "Agentic AI",
    year: "2026",
    blurb:
      "Intelligence-led police investigation platform: multilingual complaint intake (Gujarati, Hindi, English), SOP-grounded investigation paths and legal drafting. Built for ERH26.",
    stack: "TypeScript · Agents",
    href: "https://github.com/VrajVaghela/CrimeOS",
    tone: "#ff5b24",
  },
  {
    title: "FinSight AI",
    kind: "Document intelligence",
    year: "2026",
    blurb:
      "RAG for financial filings: Docling layout parsing keeps tables intact, hybrid dense + BM25 retrieval with cross-encoder reranking, and refusal gates.",
    stack: "Python · Qdrant · GenUI",
    href: "https://github.com/VrajVaghela/FinSight",
    tone: "#d9c7a3",
  },
  {
    title: "Ghost AI",
    kind: "Collaborative canvas",
    year: "2026",
    blurb:
      "Real-time system-design canvas. Drag architecture blocks, then let AI agents write specs and grade the design.",
    stack: "Next.js · React Flow · Prisma",
    href: "https://ghost-ai-rho.vercel.app/",
    tone: "#8fa8ff",
  },
  {
    title: "Cognton",
    kind: "Windows firewall",
    year: "2026",
    blurb:
      "L2–L7 packet decode with process and user attribution, enforced at kernel level through WinDivert. Virtualized tables hold 50,000+ packets/sec.",
    stack: "Rust · Tauri · React",
    href: "https://github.com/VrajVaghela/firewall",
    tone: "#c8ff5b",
  },
  {
    title: "JobPilot",
    kind: "Job-search agent",
    year: "2026",
    blurb:
      "Discovers roles, scores them with Gemini, and sends a cloud browser to research each company into an interview dossier.",
    stack: "Next.js · Stagehand · Gemini",
    href: "https://github.com/VrajVaghela/jobpilot",
    tone: "#ffb3c7",
  },
  {
    title: "CRAG",
    kind: "Corrective RAG",
    year: "2026",
    blurb:
      "Retrieval with a relevance-grading feedback loop that rewrites the query when the documents don't hold up.",
    stack: "Python · LangGraph",
    href: "https://github.com/VrajVaghela/crag",
    tone: "#7fe0d0",
  },
];

export const capabilities = [
  {
    index: "A",
    title: "Retrieval & agents",
    body: "Pipelines that know when not to answer. Adaptive retrieval, self-critique, corrective loops, and multi-agent graphs that stay grounded in the source.",
    tools: ["LangGraph", "LangChain", "FAISS", "Qdrant", "HuggingFace", "Pydantic"],
  },
  {
    index: "B",
    title: "Machine learning",
    body: "From feature pipelines to deployment trade-offs. Gradient boosting, time-series forecasting, and federated training on data that can't move.",
    tools: ["PyTorch", "scikit-learn", "XGBoost", "LightGBM", "SARIMA", "FedProx"],
  },
  {
    index: "C",
    title: "Product engineering",
    body: "The full stack around the model: typed frontends, APIs, databases, containers, and systems code when the job needs it.",
    tools: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Rust"],
  },
];

export const languages = ["C++", "Python", "TypeScript", "JavaScript", "SQL", "Rust"];

export const record = [
  {
    when: "2023 — 2027",
    what: "B.Tech, Computer Science & Engineering",
    where: "SVNIT Surat",
    note: "CGPA 8.76 / 10",
  },
  {
    when: "2025",
    what: "Top 11 of 7,000+ participants",
    where: "Walmart Sparkathon",
    note: "Sirn, stockout prediction",
  },
  {
    when: "Summer",
    what: "Amazon ML Summer School",
    where: "Amazon",
    note: "Selected attendee",
  },
];
