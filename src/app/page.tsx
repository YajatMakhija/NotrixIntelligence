import { CinematicHero } from "@/components/giga/CinematicHero";
import { EnterpriseCapabilities } from "@/components/giga/EnterpriseCapabilities";
import { LogoWall } from "@/components/giga/LogoWall";
import { OutcomesSection } from "@/components/giga/OutcomesSection";
import { ProductSpotlight } from "@/components/giga/ProductSpotlight";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProductSpotlight />
      <LogoWall />
      <EnterpriseCapabilities />
      <OutcomesSection />
    </>
  );
}
