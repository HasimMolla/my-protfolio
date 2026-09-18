// Every piece of copy and link on the site lives here, so editing the portfolio
// never means touching a component.

export const site = {
  name: "Molla Hasim",
  shortName: "Hasim",
  role: "Software Developer",
  location: "Kolkata, India",
  email: "mhasim790@gmail.com",
  url: "https://hasimmolla.com",
  tagline:
    "Software developer building web products with React and Next.js — and picking up whatever a problem actually calls for.",
};

export const socials = [
  {
    label: "GitHub",
    handle: "@HasimMolla",
    href: "https://github.com/HasimMolla",
    brand: "github",
  },
  {
    label: "LinkedIn",
    handle: "molla-hasim",
    href: "https://www.linkedin.com/in/molla-hasim",
    brand: "linkedin",
  },
  {
    label: "X",
    handle: "@_its_hasim786",
    href: "https://x.com/_its_hasim786",
    brand: "x",
  },
  {
    label: "Peerlist",
    handle: "@hasimmolla",
    href: "https://peerlist.io/hasimmolla",
    brand: "peerlist",
    // The hero keeps a tight row of three; Peerlist still appears in the
    // contact card, the flip card and the footer.
    inHero: false,
  },
];

/** The subset shown in the hero's social row. */
export const heroSocials = socials.filter((social) => social.inHero !== false);

// In-page anchors. Projects is deliberately absent — it has its own route now.
export const nav = [
  { label: "Contact", href: "#contact" },
];

// Standalone pages. Separate from `nav` because those are in-page anchors and
// these are real routes — the scroll-spy only tracks the anchors, so these
// never take the active pill.
export const routes = [
  { label: "Projects", href: "/projects" },
  { label: "Playground", href: "/playground" },
];

// `href` points at each tool's own site — the chips are outbound links.
export const stack = [
  { name: "React", brand: "react", href: "https://react.dev" },
  // Expo stands in for the React Native work — RN has no mark of its own, it
  // reuses React's atom, which would read as a duplicate chip.
  { name: "Expo", brand: "expo", href: "https://expo.dev" },
  { name: "Next.js", brand: "nextjs", href: "https://nextjs.org" },
  {
    name: "TypeScript",
    brand: "typescript",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    brand: "javascript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { name: "Tailwind CSS", brand: "tailwind", href: "https://tailwindcss.com" },
  {
    name: "HTML",
    brand: "html",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    brand: "css",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  { name: "Redux Toolkit", brand: "redux", href: "https://redux-toolkit.js.org" },
  {
    name: "Zustand",
    img: "/assets/zustand.png",
    href: "https://zustand.docs.pmnd.rs",
  },
  {
    name: "TanStack Query",
    brand: "reactquery",
    href: "https://tanstack.com/query",
  },
  { name: "Motion", brand: "motion", href: "https://motion.dev" },
  { name: "shadcn/ui", brand: "shadcn", href: "https://ui.shadcn.com" },
  { name: "Node.js", brand: "nodejs", href: "https://nodejs.org" },
  { name: "Git", brand: "git", href: "https://git-scm.com" },
  { name: "Figma", brand: "figma", href: "https://www.figma.com" },
  { name: "Vercel", brand: "vercel", href: "https://vercel.com" },
];

export const experience = [
  {
    company: "Martian Corporation",
    role: "Software Developer",
    type: "Full-time",
    period: "Aug 2023 — Present",
    start: "2023",
    // Drives the live dot on the timeline. Set false when a role ends.
    current: true,
    summary:
      "Lead frontend on client products across EdTech, PropTech and Healthcare — taking each one from an empty repository to something people use daily.",
    highlights: [
      "Built an EdTech LMS with lead tracking and course-progress reporting for both learners and admins.",
      "Shipped a PropTech CRM covering property analytics, payment flows and role-based dashboards.",
      "Delivered a hospital management system handling appointments, doctor scheduling and patient records.",
      "Worked directly with design and backend to keep API contracts and UI expectations in sync.",
    ],
    // Brand-icon keys, like `projects` — rendered as marks, not text chips.
    // "REST APIs" was dropped here: it has no logo, and the summary and
    // highlights above already say the work was API-integration heavy.
    tech: ["react", "nextjs", "typescript", "tailwind", "redux"],
  },
];

// `tech` holds brand-icon keys from components/icons/brand-icons.jsx — the
// project cards render them as a row of marks rather than text chips.
export const projects = [
  {
    name: "MyPYQBuddy",
    year: "2026",
    featured: true,
    image: "/assets/project/mypyqbuddy.jpg",
    description:
      "Exam prep for India's life-science entrance tests. Real previous-year questions, AI explanations that break down the concept instead of the answer, and analytics that point at the topics you keep losing marks on.",
    tech: ["nextjs", "react", "tailwind", "nodejs"],
    live: "https://mypyqbuddy.com/",
  },
  {
    name: "Nirmaan UI",
    year: "2025",
    featured: true,
    image: "/assets/project/nirmaan-ui.jpg",
    description:
      "A component library built on shadcn/ui and Tailwind. Copy-paste blocks for people who would rather ship than re-solve the same layout problem every project.",
    tech: ["nextjs", "typescript", "tailwind", "shadcn"],
    live: "https://nirmaan-ui.vercel.app",
    source: "https://github.com/HasimMolla/Nirmaan-ui",
  },
];

/** The landing page shows these two; /projects adds the client work. */
export const featuredProjects = projects.filter((project) => project.featured);

// Screenshots used by the hover link previews in the intro copy.
export const linkPreviews = {
  "nirmaan-ui": {
    href: "https://nirmaan-ui.vercel.app",
    image: "/assets/project/nirmaan-ui.jpg",
  },
  mypyqbuddy: {
    href: "https://mypyqbuddy.com/",
    image: "/assets/project/mypyqbuddy.jpg",
  },
};
