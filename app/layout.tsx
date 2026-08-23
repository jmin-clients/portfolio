import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Aspekta (github.com/ivodolenc/aspekta, SIL OFL 1.1, self-hosted), a modern
// grotesque sans. One face across display, body, and label registers, weight
// carries hierarchy.
const aspekta = localFont({
  variable: "--font-aspekta",
  display: "swap",
  src: [
    { path: "./fonts/aspekta/Aspekta-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/aspekta/Aspekta-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/aspekta/Aspekta-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/aspekta/Aspekta-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/aspekta/Aspekta-900.woff2", weight: "900", style: "normal" },
  ],
});

// Tanker (Fontshare), a condensed slab display face used only for the hero's
// ghost marquee and numeral/stat register.
const tanker = localFont({
  variable: "--font-tanker",
  display: "swap",
  src: [{ path: "./fonts/tanker/Tanker-Regular.woff2", weight: "400", style: "normal" }],
});

// Comico (Fontshare), a rounded display face used only for "Jonathan Min" in
// the hero headline, a deliberate signature-style accent, not a body font.
const comico = localFont({
  variable: "--font-comico",
  display: "swap",
  src: [{ path: "./fonts/comico/Comico-Regular.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  title: "Jonathan Min, Networking & Cybersecurity Notes",
  description:
    "Networking and cybersecurity notes from someone learning them in public: protocols, home lab builds, and security fundamentals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${aspekta.variable} ${tanker.variable} ${comico.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* The page got much shorter in this redesign; without this, a
            refresh on a tab that had scrolled deep into the old, longer
            layout restores that old offset, which now overshoots past the
            hero into whatever content remains. */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch (e) {}`}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
