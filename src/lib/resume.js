// Source of truth for /resume. Kept separate from data.js so the CV can carry
// detail the landing page deliberately leaves out (education, community, the
// full bullet list) without bloating the home page payload.

export const resume = {
  summary:
    "Software developer with 2+ years building scalable web applications in React and Next.js. I take products from an empty repository to something a team depends on daily — and I care most about the part people actually touch.",

  // Hasim's number is on the PDF he sends to named recruiters, which is not the
  // same as publishing it on an indexed URL. Flip to true to render it.
  phone: "+91 8016151724",
  showPhone: false,

  experience: [
    {
      company: "Martian Corporation",
      role: "Software Developer",
      location: "Kolkata, India",
      type: "Full-time",
      period: "Aug 2023 — Present",
      current: true,
      // The first three carry the role on their own — compact mode stops here.
      highlights: [
        "Built and maintained scalable web applications across EdTech, PropTech, Healthcare and EV.",
        "Shipped dashboards, CRM systems, LMS platforms, workflow automation and customer-facing apps.",
        "Currently building an EV platform covering live charging-station tracking, session monitoring, fleet management and mobility services.",
        "Worked directly with clients to gather requirements, propose technical solutions and see delivery through.",
        "Partnered with designers, developers and stakeholders on project planning, feature prioritisation and product decisions.",
        "Developed reusable components, integrated REST APIs and optimised performance for production.",
      ],
      tech: ["react", "nextjs", "typescript", "tailwind", "redux"],
    },
  ],

  projects: [
    {
      name: "MyPYQBuddy",
      note: "Freelance",
      href: "https://mypyqbuddy.com/",
      highlights: [
        "Built and deployed an end-to-end exam platform for life-science students with Next.js, React, Node.js, Express and MongoDB.",
        "Developed previous-year questions, mock exams, topic-wise practice, analytics and a full admin dashboard.",
        "Implemented an automated content pipeline: ZIP uploads, LaTeX rendering via KaTeX, JSON table processing, Cloudinary image management, deployed on Vercel and Render.",
      ],
    },
    {
      name: "Nirmaan UI",
      note: "Open source",
      href: "https://nirmaan-ui.vercel.app",
      highlights: [
        "Built a reusable component library on Next.js, Tailwind CSS and shadcn/ui.",
        "Shipped accessible, responsive Forms, Dialogs, Tabs, Navigation Menus and Data Tables.",
      ],
    },
  ],

  skills: [
    {
      group: "Frontend",
      items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    { group: "State", items: ["Redux Toolkit", "Zustand", "React Query"] },
    { group: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
    { group: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel"] },
  ],

  education: [
    {
      institution: "Aliah University",
      qualification: "B.Tech, Computer Science & Engineering",
      period: "2019 — 2023",
      detail: "CGPA 7.62",
    },
  ],

  community: [
    "Hacktoberfest 2023 contributor",
    "Member, Google Developer Groups (GDG) Kolkata",
    "Active member, React Kolkata",
  ],

  languages: [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Professional working" },
    { name: "Hindi", level: "Conversational" },
  ],
};
