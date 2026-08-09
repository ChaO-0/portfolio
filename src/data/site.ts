import classportal from "../assets/work/classportal.png";
import monark from "../assets/work/monark.png";
import stencil from "../assets/work/stencil.png";

export const site = {
  name: "Christopher Yu",
  role: "Full-stack engineer",
  location: "Bali, ID",
  // Bali is WITA (UTC+8), not Jakarta's UTC+7 — the source design says GMT+7
  timezone: "GMT+8",
  email: "chris@christopheryu.com",
  calendly: "https://calendly.com/christopheryuu/30min",
  cta: "Book a 30-minute call",
  ctaShort: "Book a call",
  github: "https://github.com/ChaO-0",
  githubHandle: "github.com/ChaO-0",
  linkedin: "https://www.linkedin.com/in/christopherycc",
  slots: "2 SLOTS, Q4 2026",
  availability: "TAKING WORK FOR Q4 2026 · 2 SLOTS",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
];

// Shipped work only. The timezone lives on the portrait badge, the drawer and the
// footer, and the EU overlap is a practical detail that belongs in the Embedded
// tier where it answers a question the buyer is already asking — not volunteered
// here, in a row whose other items are proof.
export const heroStats = ["MONARK", "STENCIL", "CLASSPORTAL"];

export const preloadSteps = [
  "resolving dependencies",
  "compiling 214 modules",
  "opening secure channel",
  "ready",
];

export const services = [
  {
    n: "01",
    title: "MVP builds",
    body: "Idea to a deployed product your users can sign into. Auth, payments, dashboards, admin and infrastructure: the unglamorous parts that decide whether it works.",
    tags: ["6–8 WEEKS", "FIXED SCOPE"],
  },
  {
    n: "02",
    title: "Backend & APIs",
    body: "Data modelling, services, queues, third-party integration. Systems that survive their second year and the load you didn't plan for.",
    tags: ["POSTGRES", "NODE · GO"],
  },
  {
    n: "03",
    title: "Web3 integration",
    body: "Contract integration, indexers, wallet flows and custody-adjacent plumbing, from someone who has shipped them with real money on the line.",
    tags: ["EVM", "INDEXERS"],
  },
  {
    n: "04",
    title: "Contract capacity",
    body: "Embedded with your team or your agency's, by the month. Work off your board or a written brief, and get shipped features back. White-label if you need it.",
    tags: ["MONTHLY", "WHITE-LABEL"],
  },
];

export const projects = [
  {
    n: "01",
    meta: "PERSONAL FINANCE · 2025",
    title: "Monark",
    body: "A money management app. Multi-account budgets, categorised transactions and a ledger that reconciles. The accounting model is the hard part, not the charts.",
    tags: ["NEXT.JS", "POSTGRES", "DOUBLE-ENTRY LEDGER"],
    host: "monark-seven.vercel.app",
    href: "https://monark-seven.vercel.app",
    shot: monark,
  },
  {
    n: "02",
    meta: "STUDIO OPERATIONS · 2025",
    title: "Stencil",
    body: "Management software for tattoo studios. Artist calendars, client bookings, deposits and consent paperwork in one place. Multi-tenant, so every query is scoped to one studio, which is the part that has to be right every time rather than most of the time.",
    tags: ["SCHEDULING", "PAYMENTS", "MULTI-TENANT"],
    host: "stencilapp.art",
    href: "https://stencilapp.art",
    shot: stencil,
  },
  {
    n: "03",
    meta: "EDUCATION · 2026",
    title: "Classportal",
    body: "Tutor and student management. Scheduling, attendance, progress notes and invoicing, with three roles that each see a different slice of the same data. Getting the permission boundaries right is most of the work.",
    tags: ["ROLES & PERMISSIONS", "INVOICING"],
    host: "classportal-dev.vercel.app",
    href: "https://classportal-dev.vercel.app",
    shot: classportal,
  },
];

export const marquee = [
  "TYPESCRIPT",
  "NODE",
  "POSTGRES",
  "NEXT.JS",
  "GO",
  "SOLIDITY",
  "REDIS",
  "AWS",
  "DOCKER",
  "GRAPHQL",
  "PRISMA",
  "THREE.JS",
];

export const process = [
  {
    meta: "STEP 01 · FREE",
    title: "Scope call",
    body: "Thirty minutes. What you're building, who it's for, what already exists. You leave knowing whether I'm the right fit.",
  },
  {
    meta: "STEP 02 · WEEK 1",
    title: "Technical plan",
    body: "Data model, architecture, third-party choices and a scoped build plan with a fixed price. Yours to keep either way.",
  },
  {
    meta: "STEP 03 · WEEKLY",
    title: "Build in slices",
    body: "A working deploy every week, not a demo at the end. You use it as it grows and redirect while it's still cheap to redirect.",
  },
  {
    meta: "STEP 04",
    title: "Hardening pass",
    body: "Auth, access control, input handling, secrets and rate limits reviewed the way I'd attack them. Included, not an upsell.",
  },
  {
    meta: "STEP 05",
    title: "Handover",
    body: "Your repos, your infrastructure, documented. Thirty days of support after launch, then a retainer only if you want one.",
  },
];

export const bio = [
  "I'm Christopher. I build web products end to end: the database, the API, the dashboard, the deploy.",
  "Five years across three very different rooms: a year at a blockchain company where mistakes are expensive and public, three at a fintech where the ledger has to balance every time, and a year at a digital agency where the deadline is the deadline. Different constraints, same job: make the thing work.",
  "Before that I played CTF competitively. Strange hobby, but it turned out to be useful: I spent years looking for the ways software breaks, so I write it differently. Security review happens while the code is written, not in an audit six months later.",
];

// the curtain's two panels: the problem slides away to reveal the fix
export const statement = {
  problem: {
    label: "THE PROBLEM",
    heading: "Most MVPs don't die from bad code. They die in the gaps.",
    body: "Between the designer and the developer. Between the developer and the deploy. Between the account manager and the person actually writing it. Every handoff costs a week you didn't budget.",
  },
  fix: {
    label: "THE FIX",
    heading: "Fewer handoffs. Whole stack, one team.",
    body: "Schema, API, dashboard, infrastructure and security review all live under one roof, start to finish. You talk directly to whoever is writing the code, every week, with nobody translating in between.",
  },
};

export const stack = [
  { label: "LANGUAGES", items: ["TypeScript", "Go", "Python", "Solidity"] },
  { label: "BACKEND", items: ["Node · NestJS", "Express", "REST · GraphQL", "Queues · Workers"] },
  { label: "FRONTEND", items: ["React · Next.js", "Tailwind", "GSAP", "three.js"] },
  { label: "DATA", items: ["PostgreSQL", "Redis", "Prisma", "ClickHouse"] },
  { label: "INFRA", items: ["AWS · GCP", "Docker", "CI/CD", "Observability"] },
  {
    label: "SECURITY",
    accent: true,
    items: ["Threat modelling", "Access control", "Contract review", "CTF background"],
  },
];

export const facts = [
  { n: "5", label: "years in production engineering" },
  { n: "3", label: "industries: chain, fintech, agency" },
  { n: "1", label: "engineer, end to end" },
];

export const timeline = [
  {
    when: "2021 — 2022",
    where: "Blockchain company",
    what: "Contract integration, indexing and wallet-facing services with real value at stake.",
  },
  {
    when: "2022 — 2025",
    where: "Fintech",
    what: "Payments, ledgers and reconciliation. Correctness under load, with regulators reading over your shoulder.",
  },
  {
    when: "2025 — NOW",
    where: "Digital agency",
    what: "Client products on fixed timelines, shipping alongside designers, PMs and other people's codebases.",
  },
];

// Three cards, one decision: a site, a product, or my time by the month.
//
// The build plan, post-launch care and codebase audits deliberately live in the
// prose under the grid instead of as cards. The plan is already a step in the
// Process section, so a card for it repeats itself; care and audits are
// follow-ons, not things anyone arrives shopping for. Six cards read as a menu
// and made the page harder to act on.
export const pricing = [
  {
    label: "WEBSITE",
    prefix: "from",
    price: "$1,999",
    body: "One to two weeks. A marketing site or company profile, built from scratch with the motion this one has. No template, no page builder.",
    includes: [
      "Custom motion, WebGL if it earns it",
      "Built to your brand, or from a sketch",
      "Your repo, your hosting",
    ],
  },
  {
    label: "MVP BUILD",
    prefix: "from",
    price: "$3,999",
    featured: true,
    body: "Six to eight weeks, fixed scope and fixed price. A deployed product, your repos, your infrastructure.",
    includes: [
      "Weekly deploys you can use",
      "Cancel at the week-three checkpoint",
      "Security hardening pass included",
      "30 days post-launch support",
    ],
  },
  {
    label: "EMBEDDED",
    price: "$2,499",
    unit: "/ MONTH",
    body: "Dedicated capacity in your team or your agency's. Minimum one month, two weeks' notice to stop.",
    includes: ["Your board, your standups", "White-label for agencies", "EU & UK morning overlap"],
  },
];
