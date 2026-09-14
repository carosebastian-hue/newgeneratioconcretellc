import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Footer } from "@/components/site/Footer";

const title = "856 NEW GENERATION CONCRETE LLC";
const description =
  "Licensed & insured concrete contractor in South Jersey. Driveways, patios, stamped concrete, foundations & commercial paving. Free estimates — (856) 326-0465.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
