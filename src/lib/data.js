// Every piece of copy and link on the site lives here, so editing the portfolio
// never means touching a component.

export const site = {
  name: "Molla Hasim",
  shortName: "Hasim",
  role: "Software Developer",
  location: "Kolkata, India",
  email: "mhasim790@gmail.com",
  url: "https://mollahasim.com",
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
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const stack = [
  { name: "React", brand: "react" },
  { name: "Next.js", brand: "nextjs" },
  { name: "TypeScript", brand: "typescript" },
  { name: "JavaScript", brand: "javascript" },
  { name: "Tailwind CSS", brand: "tailwind" },
  { name: "HTML", brand: "html" },
  { name: "CSS", brand: "css" },
  { name: "Redux Toolkit", brand: "redux" },
  { name: "Zustand", img: "/assets/zustand.png" },
  { name: "TanStack Query", brand: "reactquery" },
  { name: "Motion", brand: "motion" },
  { name: "shadcn/ui", brand: "shadcn" },
  { name: "Node.js", brand: "nodejs" },
  { name: "Git", brand: "git" },
  { name: "Figma", brand: "figma" },
  { name: "Vercel", brand: "vercel" },
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
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "REST APIs"],
  },
];

// `tech` holds brand-icon keys from components/icons/brand-icons.jsx — the
// project cards render them as a row of marks rather than text chips.
export const projects = [
  {
    name: "MyPYQBuddy",
    year: "2026",
    image: "/assets/project/mypyqbuddy.jpg",
    description:
      "Exam prep for India's life-science entrance tests. Real previous-year questions, AI explanations that break down the concept instead of the answer, and analytics that point at the topics you keep losing marks on.",
    tech: ["nextjs", "react", "tailwind", "nodejs"],
    live: "https://mypyqbuddy.com/",
  },
  {
    name: "Nirmaan UI",
    year: "2025",
    image: "/assets/project/nirmaan-ui.jpg",
    description:
      "A component library built on shadcn/ui and Tailwind. Copy-paste blocks for people who would rather ship than re-solve the same layout problem every project.",
    tech: ["nextjs", "typescript", "tailwind", "shadcn"],
    live: "https://nirmaan-ui.vercel.app",
    source: "https://github.com/HasimMolla/Nirmaan-ui",
  },
];

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
