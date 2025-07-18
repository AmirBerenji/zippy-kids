import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import FooterSide from "../component/nav/FooterSide";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="KidooHub, child care, childcare, baby care, nurse for children, pediatric nurse, baby sitter, trusted child nurse, nurse directory, nurse booking, multilingual child care, home nurse for kids, certified nurse, nurse for baby, children’s health, parental support, kids nurse platform, nursing services for children, baby health care, nurse in your area" />

        {/* Basic SEO */}
        <title>{`KidooHub | Trusted Care for Children – ${locale.toUpperCase()}`}</title>
        <meta name="description" content="KidooHub connects parents with trusted nurses for child care. Find certified childcare professionals in your area with multilingual support." />
        <meta name="keywords" content="child care, nurses, childcare, KidooHub, baby sitter, pediatric nurse, child nurse, kids health, nurse booking, multilingual child care" />
        <meta name="author" content="KidooHub Team" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="KidooHub – Trusted Childcare & Nurses" />
        <meta property="og:description" content="Find experienced and certified nurses to take care of your children. KidooHub makes childcare safe and simple." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kidoohub.com/${locale}`} />
        <meta property="og:image" content="https://kidoohub.com/og-image.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KidooHub – Trusted Childcare & Nurses" />
        <meta name="twitter:description" content="Multilingual platform to find the best child nurses. Safe, reliable, and easy to use." />
        <meta name="twitter:image" content="https://kidoohub.com/twitter-image.png" />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Language-specific */}
        <meta httpEquiv="Content-Language" content={locale} />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" hrefLang="x-default" href="https://kidoohub.com" />
        {routing.locales.map((loc) => (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`https://kidoohub.com/${loc}`}
            />
          ))}
      </head>
      <body>
        <div className="min-h-[850px]" >
        <NextIntlClientProvider >{children}</NextIntlClientProvider>
        </div>
        <FooterSide />
      </body>
    </html>
  );
}
