// Every piece of copy and link on the site lives here, so editing the portfolio
// never means touching a component.

export const site = {
  name: "Molla Hasim",
  shortName: "Hasim",
  role: "Frontend Software Developer",
  location: "Kolkata, India",
  email: "mhasim790@gmail.com",
  url: "https://mollahasim.com",
  available: true,
  availableLabel: "Open to work",
  tagline:
    "Frontend developer building fast, considered web products with React and Next.js.",
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

export const projects = [
  {
    name: "MyPYQBuddy",
    year: "2026",
    status: "Live",
    image: "/assets/project/mypyqbuddy.jpg",
    description:
      "An exam-prep platform for India's life-science entrance tests — CSIR NET, DBT BET, GATE BT and IIT JAM. Students practise real previous-year questions, get AI explanations that break down the concept instead of the answer, and see analytics that point at the topics they keep losing marks on.",
    tech: ["Next.js", "React", "Tailwind CSS", "AI Explanations", "Analytics"],
    links: [{ label: "Live site", href: "https://mypyqbuddy.com/", kind: "live" }],
  },
  {
    name: "Nirmaan UI",
    year: "2025",
    status: "Open source",
    image: "/assets/project/nirmaan-ui.jpg",
    description:
      "A frontend component library built on shadcn/ui and Tailwind CSS. Copy-paste blocks and components for people who would rather ship a product than re-solve the same layout problem every project.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Live demo", href: "https://nirmaan-ui.vercel.app", kind: "live" },
      {
        label: "Source",
        href: "https://github.com/HasimMolla/Nirmaan-ui",
        kind: "source",
      },
    ],
  },
];
