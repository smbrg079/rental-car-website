import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalcar.example.com";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ locale }: { locale?: string }) {
  const lang = locale || routing.defaultLocale;
  const url = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Premium Rental Car",
    description: "Rent premium luxury cars at the best prices. 50+ vehicles, 24/7 support.",
    url,
    telephone: "+1-555-RENTAL",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Luxury Drive",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "350",
      bestRating: "5",
    },
  };

  return <JsonLd data={data} />;
}

export function CarJsonLd({
  car,
  locale,
}: {
  car: { id: string; model: string; type: string; price: number; rating: number };
  locale?: string;
}) {
  const lang = locale || routing.defaultLocale;
  const base = lang === routing.defaultLocale ? "" : `/${lang}`;
  const url = `${SITE_URL}${base}/cars/${car.id}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.model,
    description: `${car.type} - Premium rental vehicle`,
    url,
    brand: {
      "@type": "Brand",
      name: car.model.split(" ")[0] || "Premium",
    },
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.rating,
      reviewCount: "25",
      bestRating: "5",
    },
  };

  return <JsonLd data={data} />;
}
