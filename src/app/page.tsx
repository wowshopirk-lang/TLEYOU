import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BentoProblemSolution from "@/components/home/BentoProblemSolution";
import BentoSocialProof from "@/components/home/BentoSocialProof";
import BentoFeatures from "@/components/home/BentoFeatures";
import BentoSubscription from "@/components/home/BentoSubscription";
import BentoFAQ from "@/components/home/BentoFAQ";
import BentoCTA from "@/components/home/BentoCTA";

// Schema.org structured data for the product
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Набор TLEYOU",
  "description": "Набор для медитации и осознанности. Включает керамическую подставку, травяную скрутку и 30 карточек для рефлексии.",
  "brand": {
    "@type": "Brand",
    "name": "TLEYOU"
  },
  "offers": {
    "@type": "Offer",
    "price": "3990",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31",
    "seller": {
      "@type": "Organization",
      "name": "TLEYOU"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500"
  }
};

// Schema.org for the organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TLEYOU",
  "url": "https://tleyou.ru",
  "description": "Ритуал возвращения к себе для женщин",
  "sameAs": [
    "https://t.me/tleyouself"
  ]
};

export default function Home(_props: Record<string, never>) {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <Header />
      <main itemScope itemType="https://schema.org/WebPage">
        <article>
          <Hero />
          <BentoProblemSolution />
          <BentoSocialProof />
          <BentoFeatures />
          <BentoSubscription />
          <BentoFAQ />
          <BentoCTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
