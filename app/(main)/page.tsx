import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { SecurityTrust } from "@/components/sections/SecurityTrust";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { SEOArticles } from "@/components/sections/SEOArticles";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <InteractiveDemo />
      <SecurityTrust />
      <Pricing />
      <Testimonials />
      <SEOArticles />
      <CallToAction />
    </div>
  );
}
