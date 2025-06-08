import Image from "next/image";
import Link from "next/link";

const techIcons = [
  {
    name: "React",
    icon: "https://ext.same-assets.com/2104456481/1744144082.svg",
  },
  {
    name: "Next JS",
    icon: "/assets/nextjs.svg",
  },
  {
    name: "JavaScript",
    icon: "https://ext.same-assets.com/2104456481/469507881.svg",
  },
  {
    name: "TypeScript",
    icon: "https://ext.same-assets.com/2104456481/3634865391.svg",
  },
  {
    name: "Tailwind",
    icon: "https://ext.same-assets.com/2104456481/53298745.svg",
  },
  {
    name: "HTML",
    icon: "https://ext.same-assets.com/2104456481/817861462.svg",
  },
  {
    name: "CSS",
    icon: "https://ext.same-assets.com/2104456481/3751557303.svg",
  },
  {
    name: "Redux Toolkit",
    icon: "/assets/redux.svg",
  },
  {
    name: "Zustand",
    icon: "/assets/zustand.png",
  },
  {
    name: "Git",
    icon: "/assets/git.svg",
  },
];

export default function Home() {
  return (
    <div className="bg-[#0c0c14] w-full">
      <div className="min-h-screen  text-[#eceae8] font-sans h-full w-full mx-auto max-w-4xl p-6 antialiased">
        {/* Header/navbar */}
        <header className="w-full pt-5 pb-10">
          <nav className="w-full flex items-center justify-between">
            <Link
              className="font-bold uppercase text-[#eceae8] text-lg tracking-widest hover:text-white"
              href="/"
            >
              Molla Hasim
            </Link>
            <div className="flex items-center gap-6 text-lg text-[#eceae8] max-md:hidden">
              <a className="hover:text-white" href="#work-experience">
                Work Experience
              </a>
              <a className="hover:text-white" href="#projects">
                Projects
              </a>
              <a className="hover:text-white" href="#contact">
                Contact
              </a>
            </div>
          </nav>
        </header>

        {/* Hero section */}
        <main className="w-full flex flex-col items-center">
          <div className="flex flex-row gap-10 items-center py-10 max-md:flex-col max-md:text-center">
            <div className="flex-shrink-0 mb-4">
              {/* Profile image placeholder with border */}
              <div className="rounded-full border-4 border-[#e36a89] p-1 w-40 h-40 flex items-center justify-center bg-[#222]">
                {/* Profile image intentionally left blank as per instructions */}

                <Image
                  alt="LinkedIn"
                  src="/assets/profile_pic.png"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 max-md:items-center">
              <h1 className="text-[#a7adb1] font-bold text-2xl tracking-wide relative">
                <span className="text-white">Hey, I&apos;m Hasim.</span>{" "}
                I&apos;m a Frontend <br />
                Software Developer.
                <span className="inline-block align-middle ml-3">
                  <span className="bg-green-600/20 text-green-600 text-sm px-3 py-1 rounded-full ml-2 relative top-[-2px] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600 inline-block mr-1" />
                    Open to work
                  </span>
                </span>
              </h1>
              <div className="flex flex-col gap-2 w-full max-md:items-center">
                <div className="flex justify-between  items-center text-[#eceae8] text-base">
                  <Link
                    href="https://www.google.com/maps/place/Belgrade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#eceae8] hover:text-white flex items-center gap-1"
                  >
                    <div className="text-[#636265]">🏠</div>
                    Kolkata, India.
                  </Link>

                  <div className="flex items-center gap-4">
                    <Link
                      href="https://www.linkedin.com/in/molla-hasim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center hover:text-white ml-4"
                    >
                      <Image
                        alt="LinkedIn"
                        src="https://ext.same-assets.com/2104456481/3081479786.svg"
                        width={100}
                        height={100}
                        className="w-5 h-5"
                      />
                      LinkedIn
                    </Link>
                    <Link
                      href="https://github.com/HasimMolla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center hover:text-white ml-2"
                    >
                      <Image
                        alt="GitHub"
                        className="w-5 h-5"
                        src="https://ext.same-assets.com/2104456481/967781756.svg"
                        width={100}
                        height={100}
                      />
                      GitHub
                    </Link>
                    <Link
                      href="https://peerlist.io/hasimmolla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center hover:text-white ml-2"
                    >
                      <Image
                        alt="GitHub"
                        className="w-5 h-5"
                        src="/assets/peerlist.jpg"
                        width={100}
                        height={100}
                      />
                      Peerlist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <section className="w-full py-10">
            <h2 className="font-bold text-lg tracking-widest text-white uppercase mb-10">
              Tools & Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
              {techIcons.map((tech) => (
                <div
                  key={tech.name}
                  className="border border-[#eceae8]/50 hover:bg-[#eceae8]/10 hover:text-white gap-1.5 h-24 text-[#eceae8] rounded-lg p-3 flex flex-col items-center justify-center transition-all ease-in-out group cursor-pointer  group"
                >
                  <Image
                    width={100}
                    height={100}
                    src={tech.icon}
                    alt={tech.name}
                    className="w-8 h-8 mb-2 group-hover:scale-125 transition-all"
                  />
                  <p>{tech.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section id="work-experience" className="w-full space-y-5 py-10">
            <h2 className="font-bold text-lg tracking-widest text-white uppercase ">
              Work Experience
            </h2>
            <div className="flex flex-col w-full gap-14">
              <div className="flex w-full gap-10">
                <p className="text-[#636265] whitespace-nowrap max-sm:hidden">
                  Aug, 2023 - Present
                </p>
                <div className="flex flex-col">
                  <p className="text-white text-lg font-semibold">
                    Software Developer
                  </p>
                  <p className="text-[#a7adb1] mb-4">
                    Martian Corporation • Full-time
                    <span className="text-[#a7adb1] whitespace-nowrap hidden max-sm:inline-block ml-2">
                      • (2023 - 2025)
                    </span>
                  </p>
                  <div className="text-[#a7adb1] max-w-2xl space-y-2">
                    <p>
                      Led and developed scalable web and app projects across
                      <span className="text-white"> EdTech</span>,{" "}
                      <span className="text-white">PropTech</span>, and
                      <span className="text-white"> Healthcare</span>, using
                      <span className="text-white">
                        {" "}
                        React/Next.js
                      </span> with <span className="text-white">API </span>
                      integrations.
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Delivered platforms like EdTech LMS (lead tracking,
                        course progress), PropTech CRM (analytics, payments),
                        and Hospital System (appointments, scheduling).
                      </li>
                      <li>
                        Collaborated across teams to align technology with
                        business needs.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="w-full py-10 space-y-5">
            <h2 className="font-bold text-lg tracking-widest text-white uppercase ">
              Projects
            </h2>
            <div className="flex flex-col w-full">
              <div className="flex items-start gap-8">
                <div className="rounded-lg w-[640px] border border-[#eceae8]/50 p-2 md:p-5 flex flex-col gap-5">
                  {/* Project image */}
                  <Image
                    src="/assets/project/nirmaanUi.png"
                    width={500}
                    height={500}
                    alt="Tribe app screenshot"
                    className="rounded-[10px] w-full h-[200px] object-cover md:h-auto border border-[#eceae8]/20  "
                  />
                  <div className="flex flex-col  space-y-2 md:space-y-3">
                    <p className="font-semibold text-white text-xl tracking-widest">
                      Nirmaan UI
                    </p>
                    <p className="text-[#a7adb1] ">
                      <span className="text-[#ffffff]">Nirmaan UI</span> is a
                      frontend UI library—built with Shadcn and Tailwind CSS—to
                      help developers build modern, responsive apps faster and
                      smarter. Not just components, but a creative toolkit for
                      crafting exceptional user experiences.
                    </p>
                    <div className="grid grid-cols-4 max-sm:grid-cols-3 max-[500px]:grid-cols-2 items-center gap-2 mt-5">
                      <div className="flex h-6 items-center justify-center gap-1.5 px-4 rounded-full bg-blue-600/20 text-blue-300">
                        <p className="text-xs whitespace-nowrap">Next</p>
                      </div>
                      <div className="flex h-6 items-center justify-center gap-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300">
                        <p className="text-xs whitespace-nowrap">TypeScript</p>
                      </div>
                      <div className="flex h-6 items-center justify-center gap-1.5 px-4 rounded-full bg-blue-400/20 text-blue-300">
                        <p className="text-xs whitespace-nowrap">Tailwind</p>
                      </div>
                      <div className="flex h-6 items-center justify-center gap-1.5 px-4 rounded-full bg-white/20 text-white">
                        <p className="text-xs whitespace-nowrap">Shadcn</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full max-md:flex-col">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/3 bg-[#eceae8]/10 uppercase text-xs transition-all hover:bg-[#eceae8]/20 rounded-full font-bold text-white flex items-center justify-center px-4 py-2 gap-2 max-md:w-full"
                        href="https://github.com/HasimMolla/Nirmaan-ui"
                      >
                        <Image
                          src="/assets/project/live.svg"
                          width={100}
                          height={100}
                          alt="live icon"
                          className="w-5 h-5"
                        />
                        Live demo
                      </Link>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/3 bg-[#eceae8]/10 uppercase text-xs transition-all hover:bg-[#eceae8]/20 rounded-full font-bold text-white flex items-center justify-center px-4 py-2 gap-2 max-md:w-full"
                        href="https://github.com/HasimMolla/Nirmaan-ui"
                      >
                        <Image
                          src="/assets/project/git.svg"
                          width={100}
                          height={100}
                          alt="live icon"
                          className="w-5 h-5"
                        />
                        Source code
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Could add more projects below */}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            id="contact"
            className="w-full flex items-center pt-6 border-t border-[#eceae8]/20 pb-1 mt-5"
          >
            <div className="flex items-center gap-2 text-[#eceae8] hover:text-white">
              <Image
                src="/assets/mail.svg"
                width={100}
                height={100}
                alt="live icon"
                className="w-5 h-5"
              />
              <a href="mailto:mhasim790@gmail.com">mhasim790@gmail.com</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
