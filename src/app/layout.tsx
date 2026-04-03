import type { Metadata } from "next";
import { Tiro_Bangla, Hind_Siliguri, Noto_Serif_Bengali, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReadingModeProvider } from "@/components/providers/ReadingModeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const tiroBangla = Tiro_Bangla({
  weight: '400',
  subsets: ['bengali'],
  variable: '--font-tiro-bangla',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-noto-serif-bengali',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "গল্পের.পাতা — বাংলা সাহিত্যের উন্মুক্ত ভান্ডার",
    template: "%s | গল্পের.পাতা",
  },
  description: "বাংলা সাহিত্যের উন্মুক্ত ভান্ডার — সম্পূর্ণ বিনামূল্যে বাংলা গল্প পড়ুন। কোনো বিজ্ঞাপন নেই, কোনো নিবন্ধন নেই।",
  keywords: ["বাংলা গল্প", "Bengali stories", "বাংলা সাহিত্য", "গল্পের পাতা", "free Bengali literature"],
  authors: [{ name: "Ryan Shelby", url: "https://github.com/MdSagorMunshi" }],
  creator: "Ryan Shelby",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://golperpata.vercel.app",
    siteName: "গল্পের.পাতা",
    title: "গল্পের.পাতা — বাংলা সাহিত্যের উন্মুক্ত ভান্ডার",
    description: "সম্পূর্ণ বিনামূল্যে বাংলা গল্প পড়ুন।",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://golperpata.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`
        ${tiroBangla.variable}
        ${hindSiliguri.variable}
        ${notoSerifBengali.variable}
        ${crimsonPro.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <head>
        {/* Prevent dark mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('golperpata-theme');
                if (t) document.documentElement.setAttribute('data-theme', t);
                else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
                  document.documentElement.setAttribute('data-theme', 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ReadingModeProvider>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ReadingModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
