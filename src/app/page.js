import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { site, socials } from "@/lib/data";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressCountry: "IN" },
  sameAs: socials.map((social) => social.href),
};

export default function Home() {
  return (
    <>
      <CursorGlow />
      <main className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8">
        <Hero />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <script
        type="application/ld+json"
        // Static, author-controlled JSON-LD for rich results.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
