import type { Metadata } from "next";
import { Montserrat, Kanit } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layout/Header/Header";
import { ConsentProvider } from "@/components/privacy/ConsentContext";
import CookieConsent from "@/components/privacy/CookiesConsent";




const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "300", "400"],
  preload: false, 
})

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["200", "300", "400"],
  preload: false, 
})

export const metadata: Metadata = {
  title: "Renovierung & Innenausbau in Gießen | Bauunternehmen und Handwerker",
  description: "Professionelle Renovierung, Innenausbau und Handwerksarbeiten. Qualität, Zuverlässigkeit und faire Preise. Jetzt kostenloses Angebot anfordern.",
  keywords: [
    "Renovierung",
    "Innenausbau",
    "Handwerker",
    "Bauunternehmen",
    "Gießen",
    "Biebertal",
  ],
  alternates: {
    canonical: "https://jokic-mont-de.vercel.app/",
  },
  openGraph: {
    title: "Renovierung & Innenausbau in Gießen | Bauunternehmen & Handwerker",
    description:
      "Professionelle Renovierung und Innenausbau. Zuverlässige Handwerker – kostenlose Beratung und Angebot.",
    url: "https://jokic-mont-project.vercel.app/",
    siteName: "Renovierung & Innenausbau",
    images: [
      {
        url: "https://jdmw.de/wp-content/uploads/go-x/u/f0858435-3496-4ab7-ae69-99f0eef57fb9/l0,t0,w2000,h955/image-960x458.png",
        width: 1200,
        height: 630,
        alt: "Renovierung Innenausbau Bauunternehmen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovierung & Innenausbau | Bauunternehmen & Handwerker",
    description:
      "Renovierung, Innenausbau und Handwerksleistungen – professionell & zuverlässig.",
    images: ["https://jdmw.de/wp-content/uploads/go-x/u/f0858435-3496-4ab7-ae69-99f0eef57fb9/l0,t0,w2000,h955/image-960x458.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${kanit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
     <ConsentProvider>
  <Header />
  {children}
  <CookieConsent />
  </ConsentProvider>
      </body>
    </html>
  );
}
