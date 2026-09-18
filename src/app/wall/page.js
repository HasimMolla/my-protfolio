import { SignatureWall } from "@/components/wall/signature-wall";
import { site } from "@/lib/data";

export const metadata = {
  title: "Signature wall",
  description: `Draw your own signature and add it to the wall on ${site.name}'s site.`,
  alternates: { canonical: "/wall" },
  openGraph: {
    title: `Signature wall — ${site.name}`,
    description: "Draw something. It joins the wall, drawn the way you drew it.",
    url: `${site.url}/wall`,
  },
};

export default function WallPage() {
  return <SignatureWall />;
}
