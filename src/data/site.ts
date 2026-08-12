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

// One card per thing the pricing grid sells, in the same order and using the same
// words. Two vocabularies on one page meant a reader could not tell that
// "contract capacity" and the EMBEDDED tier were the same product, and that the
// sites they were being quoted for appeared nowhere in what he says he does.
// Web3 stays a credential inside the backend card rather than a headline service
// with no price attached to it.
export const services = [
  {
    n: "01",
    title: "Sites",
    body: "A landing page or a full site, hand-built rather than assembled from a template. Motion where it earns its place, and content you can edit yourself on the larger ones.",
    tags: ["1–2 WEEKS", "FIXED SCOPE"],
  },
  {
    n: "02",
    title: "Product builds",
    body: "Idea to a deployed product your users can sign into. Auth, payments, dashboards, admin and infrastructure: the unglamorous parts that decide whether it works.",
    tags: ["6–14 WEEKS", "FIXED SCOPE"],
  },
  {
    n: "03",
    title: "Backend & APIs",
    body: "Data modelling, services, queues, third-party integration. Systems that survive their second year and the load you didn't plan for. Contract integration and indexers too, shipped with real money on the line.",
    tags: ["POSTGRES", "NODE · GO"],
  },
  {
    n: "04",
    title: "Embedded capacity",
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

// Four sizes of the same thing: a build. Every tier answers the same list of
// rows, so the grid is a comparison rather than four unrelated bullet lists,
// and the reader can see what the cheap one does not get.
//
// The landing page and the website sit next to each other at very different
// prices, so the row that separates them — editing your own content — has to be
// in the grid. In the prose it was invisible, and two adjacent cards that score
// the same read as the same product at two prices. Both names describe what the
// buyer gets, never how it is built: nobody shops for "static".
//
// Embedded capacity lives below the grid instead of in it. It is a different
// trade, not a smaller build: rented time with no fixed scope. Put in a column
// it scores ✗ on fixed price and scope-in-advance, which makes the steadiest
// revenue on the page look like the worst option.
//
// The build plan, post-launch care and codebase audits stay in the prose under
// the grid. The plan is already a step in the Process section, and care and
// audits are follow-ons, not things anyone arrives shopping for.

/** One row per promise, in the order they appear on every card. */
export const includedRows = [
  "Fixed price, agreed before we start",
  "Your repos, your hosting",
  "Custom motion, WebGL if it earns it",
  "Content you can edit yourself",
  "Weekly deploys you can use",
  "A checkpoint you can cancel at",
  "Security hardening pass",
  "30 days post-launch support",
  "Several kinds of user, with permissions",
  "Payments and outside integrations",
];

/** true: included as written. false: not. string: included, worded for this tier. */
export type Included = boolean | string;

// Each pair is one thing in two sizes, and nobody compares across the pairs: a
// founder needing a product never reads the site cards, and a brand needing a
// site never reads the product ones. Grouping them turns four choices into two
// easy ones — pick the pair, then pick the size — instead of a reader scanning
// four cards trying to work out which one describes them.
export const pricingGroups = [
  { key: "SITES", note: "No login, no database. Pages people read." },
  { key: "PRODUCTS", note: "Login, data, and users doing work inside it." },
];

export const pricing = [
  {
    group: "SITES",
    label: "LANDING PAGE",
    prefix: "from",
    price: "$999",
    span: "One week",
    body: "One page, hand-built, with the content set at launch. For a product launch, an event, or a first presence.",
    included: [
      true,
      true,
      "Motion, no WebGL",
      false,
      false,
      false,
      false,
      true,
      false,
      false,
    ] as Included[],
  },
  {
    group: "SITES",
    label: "WEBSITE",
    prefix: "from",
    price: "$2,499",
    span: "One to two weeks",
    body: "Up to six pages, and you edit the content yourself. For brands who need a site that looks built rather than assembled.",
    included: [true, true, true, true, false, false, false, true, false, false] as Included[],
  },
  {
    group: "PRODUCTS",
    label: "MVP BUILD",
    prefix: "from",
    price: "$7,999",
    span: "Six to eight weeks",
    featured: true,
    body: "For founders finding out whether the thing works, on a date they can plan around.",
    included: [
      true,
      true,
      true,
      true,
      true,
      "Cancel at the week-three checkpoint",
      true,
      true,
      false,
      false,
    ] as Included[],
  },
  {
    group: "PRODUCTS",
    label: "PRODUCTION BUILD",
    prefix: "from",
    price: "$13,999",
    span: "Twelve to fourteen weeks",
    body: "The finished version that carries real users and real money: a SaaS, an internal dashboard, a tool your team runs on.",
    included: [
      true,
      true,
      true,
      true,
      true,
      "Cancel at the week-five checkpoint",
      true,
      true,
      true,
      true,
    ] as Included[],
  },
];

export const embedded = {
  label: "EMBEDDED",
  price: "$3,499",
  unit: "/ MONTH",
  body: "Dedicated capacity in your team or your agency's, rather than a scoped build. Minimum one month, two weeks' notice to stop.",
  includes: ["Your board, your standups", "White-label for agencies", "EU & UK morning overlap"],
};
