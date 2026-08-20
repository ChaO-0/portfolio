import portrait from "../assets/portrait.png";
import classportal from "../assets/work/classportal.png";
import monark from "../assets/work/monark.png";
import stencil from "../assets/work/stencil.png";

export const site = {
  name: "Christopher Yu",
  role: "Product engineer",
  location: "Bali, Indonesia",
  timezone: "UTC+8",
  email: "chris@christopheryu.com",
  calendly: "https://calendly.com/christopheryuu/30min",
  github: "https://github.com/ChaO-0",
  linkedin: "https://www.linkedin.com/in/christopherycc",
  x: "https://x.com/christopheryuu_",
  /** One description of the person, for structured data. Not page copy. */
  bio: "Product engineer. Five years shipping production software across a blockchain company, a fintech and a digital agency, building SaaS, internal tools and product websites end to end.",
};

/**
 * Home page sections, in order. Drives the rail dots and the scroll counter.
 *
 * Six, not seven: the home page is a set of teasers now, and each one hands off to
 * a page that carries the detail. Process left the home page entirely and its five
 * steps live under How it works on /services, where someone weighing a quote is
 * already reading.
 */
export const sections = [
  { id: "hero", label: "Hero" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// A map of the business, not of the home page. Every entry is a whole page and
// nothing else: an item that scrolled to a section instead of navigating read as a
// mistake beside the ones that did, which is why About became a page and Pricing
// stopped being a link at all. Pricing is found through Services, where the numbers
// sit next to the things they price. Agencies keeps a slot of its own because
// agency owners are the segment most likely to convert and the least likely to
// scroll looking for it.
export const nav = [
  { label: "Work", href: "/work" },
  { label: "Systems", href: "/systems" },
  { label: "Services", href: "/services" },
  { label: "Agencies", href: "/for-agencies" },
  { label: "About", href: "/about" },
];

/**
 * The "§ 04" a section prints, derived rather than typed. When Process left the
 * home page every number below it was suddenly wrong, and hand-written ones would
 * have drifted again the next time the order changed.
 */
export const sectionNo = (id: string) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export const portraitShot = portrait;

// `flip` puts the screenshot first, so the three projects alternate down the page.
export const projects = [
  {
    n: "01",
    id: "w-monark",
    teaser: "Forecast-first finance. Every total derived from the transactions, money as branded integers.",
    index: "/work/monark",
    category: "PERSONAL FINANCE · IN PRODUCTION",
    blurb: "Forecast-first finance. The dashboard states your position for the month in a sentence, and budgets carry pace markers.",
    caseStudy: true,
    title: "Monark",
    href: "/work/monark",
    shot: monark,
  },
  {
    n: "02",
    id: "w-classportal",
    teaser: "Tutor operations behind one GraphQL API. Sessions, assignments, students and invoicing.",
    index: "/work/classportal",
    category: "TUTOR OPERATIONS · IN PRODUCTION",
    blurb: "Students, sessions, assignments and invoicing in one system, for a tutor working alone or inside an agency. Invoices render to PDF and go out by email.",
    caseStudy: true,
    title: "ClassPortal",
    href: "https://classportal-dev.vercel.app",
    shot: classportal,
  },
  {
    n: "03",
    id: "w-stencil",
    teaser: "Studio management on two state machines: an enquiry that gets quoted, a booking that gets kept.",
    index: "/work/stencil",
    category: "STUDIO MANAGEMENT · IN PRODUCTION",
    blurb: "An enquiry funnel and a booking lifecycle, deliberately kept apart. Reminders are tracked per send, so a failed message is visible rather than assumed.",
    caseStudy: true,
    title: "Stencil",
    href: "https://stencilapp.art",
    shot: stencil,
  },
];

/** Legend rows beside the three.js spine — index matches a node in the model. */
export const nodes = [
  {
    title: "Client",
    body: "Typed end to end. No untyped fetch calls crossing the boundary.",
  },
  {
    title: "API",
    body: "One surface, validated at the edge. Business rules live here, not in components.",
  },
  {
    title: "Postgres",
    body: "The only place that holds the truth. Constraints in the schema, not in the app.",
  },
  {
    title: "Cache",
    body: "Added when a read gets expensive, never before. Always invalidatable by hand.",
  },
  {
    title: "Workers",
    body: "PDFs, email, imports, anything slow. Retried, logged, never in the request path.",
  },
  {
    title: "Edges",
    body: "Payments, mail, storage. Wrapped so one of them dying does not take the product with it.",
  },
];

export const steps = [
  {
    title: "Scope",
    body: "We agree what ships and what does not, written down as a spec with a schema sketch attached.",
    gets: ["Written spec", "Fixed scope list", "Estimate in weeks"],
  },
  {
    title: "Architecture",
    body: "Data model, service boundaries, third-party choices and the failure cases, decided before any UI exists.",
    gets: ["Schema", "System diagram", "Trade-off notes"],
  },
  {
    title: "Build",
    body: "Weekly increments, deployed to a real URL you can use. No month-long silence ending in a demo.",
    gets: ["Weekly deploys", "Staging URL", "Direct engineer access"],
  },
  {
    title: "Ship",
    body: "Domain, monitoring, backups, error tracking. The unglamorous part that decides whether launch week is calm.",
    gets: ["Production setup", "Monitoring", "Handover docs"],
  },
  {
    title: "Run",
    body: "Iterate on real usage, or hand it over cleanly to your team. Both are fine; leaving you stranded is not.",
    gets: ["Iteration", "Or clean handover", "Documented code"],
  },
];

// One entry per service, read twice: the home grid uses `short`, /services uses
// everything else. Two lists would have drifted the moment a name changed.
//
// Three primary doors, sorted by the problem a visitor already knows they have —
// "I have a product idea", "my workflow is a mess", "I need a website" — rather
// than by how big the job is. Product build, MVP sprint and backend work were
// three cards describing one job at three sizes; they are one door now.
//
// Internal tools stays its own door on evidence: ClassPortal and Stencil are two
// of the three products in the portfolio, so it is the best-proven thing here.
//
// Starting prices, deliberately low for someone with no client logos yet: the job
// is to start conversations, not to defend a number. Not in the Person schema —
// "from" figures make a poor machine-readable claim.
export const services = [

  {
    id: "build",
    nav: "PRODUCT BUILD",
    title: "Product build",
    tagline: "New SaaS, MVPs and web applications.",
    short:
      "New SaaS, MVPs and web applications, taken from an idea to something running in production.",
    price: "from $7,500",
    unit: "SCOPED PER PROJECT",
    body: "A product idea, or a validated one with no engineering behind it, taken through to something running in production with real users on it. Design, frontend, backend, schema, integrations, deployment and the monitoring that tells you when it breaks. One engineer holding the whole picture, which is why the parts fit together.",
    youGet:
      "A written spec and schema before code · weekly deploys to a real URL you can use · production setup, backups and monitoring · handover docs your next engineer can follow",
    need: "One decision-maker who can answer questions the same week · clarity on what must ship versus what would be nice · access to whoever actually uses the thing",
  },
  {
    id: "tools",
    nav: "INTERNAL TOOLS",
    title: "Internal tools",
    tagline:
      "Dashboards, workflows and business software replacing spreadsheets and manual processes.",
    short:
      "Dashboards, workflows and business software that replace the spreadsheet your team actually runs on.",
    price: "from $5,000",
    unit: "PER TOOL",
    body: "The spreadsheet your operations actually run on, turned into software, with permissions, an audit trail, and numbers that agree with each other. This is most of what ClassPortal and Stencil are: scheduling, invoicing, reporting, roles. Unglamorous, high leverage, and usually the fastest money a team saves.",
    youGet:
      "Roles and permissions that match how your team really works · imports from whatever you use now · reports that reconcile · training for the people who use it daily",
    need: "Time with the people doing the work, not just the person commissioning it · a copy of the current spreadsheet, mess included · the edge cases everyone knows and nobody wrote down",
    // The one qualification line on the page. It argues against his own interest,
    // which is what makes it read as judgement rather than as a sales filter.
    note: "If an off-the-shelf tool solves the problem better, I will tell you.",
  },

  {
    id: "website",
    nav: "PRODUCT WEBSITE",
    title: "Product website",
    tagline: "High-quality marketing and product websites.",
    short:
      "Marketing and product sites, designed and built by the person who understands what they are selling.",
    price: "from $2,500",
    unit: "DESIGN + BUILD",
    body: "A site built by someone who understands the product it is selling, which means the technical claims are accurate and the demos are real. Fast, accessible, and editable by your team afterwards. This site is the sample.",
    youGet:
      "Design and build together · real performance, not a slow page with an animation on it · content your team can edit without me · analytics wired up properly",
    need: "Who the site is talking to and what you want them to do · final copy, or the authority to write it · brand assets if they exist",
  },
];

// Kept on the site, deliberately not at the weight of the three above: there is no
// rescue in the portfolio yet. It gets a compact block rather than a full card,
// and it earns equal billing when there is a case study behind it.
export const rescue = {
  id: "rescue",
  title: "Rescue & takeover",
  price: "from $3,500",
  unit: "AUDIT FIRST",
  body: "A product that is half-finished, hard to maintain, or abandoned by whoever built it. The first job is not rewriting it. It is reading it, writing down how it actually works, getting it deploying reliably, and finding out what breaks. That audit comes first and stands on its own: a written map of the system, a risk list worst first, and a repeatable deploy, whether or not I do the work that follows.",
};

// The agency offer gets its own page and its own nav slot. An agency owner buys a
// different thing from a founder: not a scoped project, but a person they can put
// on work they have already sold.
export const agency = {
  price: "from $3,500",
  unit: "PER MONTH",
  points: [
    {
      nav: "CAPACITY",
      title: "Senior engineering capacity",
      body: "A set amount of my week, every week, on whatever you have sold. Frontend, backend, schema, deploys. Not a junior you have to review.",
    },
    {
      nav: "NO HIRE",
      title: "No full-time hire",
      body: "No recruiting, no notice period, no bench when the pipeline is quiet. Two weeks' notice to stop, and one month minimum so neither of us is scoping for free.",
    },
    {
      nav: "WHITE-LABEL",
      title: "White-label",
      body: "I work under your name. Your repos, your client relationship, your standups if you want me in them. Your client never has to know there is a second company.",
    },
    {
      nav: "OVERLAP",
      title: "Hours that overlap yours",
      body: "I am on UTC+8: a full working day alongside Asia-Pacific, and afternoon-to-evening cover for Europe and the UK. Same-day answers are normal rather than a promise, and work lands while you are asleep rather than after you have moved on.",
    },
    {
      nav: "DIRECT COMMS",
      title: "Direct communication",
      body: "You talk to the person writing the code. No account manager translating a brief into a ticket and back again.",
    },
    {
      nav: "MONTHLY",
      title: "Flexible monthly",
      body: "Scale the days up for a launch and back down after it. Priorities agreed as we go, off your board or a written brief.",
    },
  ],
};

/** The full ladder. Projects ascend; ongoing work is its own row. */
/**
 * Derived, not written out: same names, same prices, same order as the services
 * above it. Typed separately it ran cheapest-first while the services ran
 * flagship-first, so the page listed the same four things in two different orders
 * within one scroll, and every price existed in two places to disagree.
 *
 * The order is by what is being sold, not by what it costs. These are different
 * products rather than tiers of one, so a buyer arrives already knowing which row
 * is theirs and never reads it as a ladder.
 */
export const priceList = [
  ...services.map((s) => ({
    label: s.title,
    price: s.price,
    unit: s.unit.toLowerCase(),
    href: `#${s.id}`,
  })),
  { label: rescue.title, price: rescue.price, unit: rescue.unit.toLowerCase(), href: `#${rescue.id}` },
  {
    label: "Agency capacity",
    price: agency.price,
    unit: agency.unit.toLowerCase(),
    href: "/for-agencies",
    ongoing: true,
  },
];

export const stack = [
  { label: "LANGUAGE", items: "TypeScript, strict, end to end" },
  { label: "FRONTEND", items: "Next.js · React · Tailwind" },
  { label: "BACKEND", items: "Node · Express · Server Actions" },
  { label: "DATA", items: "Postgres · Prisma · Supabase · Redis" },
  { label: "INFRA", items: "Vercel · Docker · GitHub Actions" },
  { label: "SECURITY", items: "Threat modelling · access control · CTF background" },
];

export const facts = [
  { label: "BASED", value: "Bali, Indonesia · UTC+8" },
  { label: "WORKING WITH", value: "Remote · any timezone I can cover" },
  { label: "BACKGROUND", value: "CTF player · 5 years in production" },
  { label: "STATUS", value: "Available for new projects", accent: true },
  {
    label: "STACK",
    value:
      "Next.js · React · TypeScript · Tailwind · Node / Express · Supabase · Postgres · Prisma · Redis · Vercel",
    wide: true,
  },
];
