import { ResumeView } from "@/components/resume/resume-view";
import { site } from "@/lib/data";

export const metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.role} based in ${site.location}.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Résumé — ${site.name}`,
    description: `${site.role} based in ${site.location}.`,
    url: `${site.url}/resume`,
  },
};

export default function ResumePage() {
  return <ResumeView />;
}
