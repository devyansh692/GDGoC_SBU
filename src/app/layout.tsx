
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const firaSans = Fira_Sans({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GDG on Campus · Sarala Birla University",
  description:
    "A community of curious builders at Sarala Birla University, Ranchi. Learn, build, and grow together with Google Developer Groups.",
  metadataBase: new URL("https://gdg.community.dev/gdg-on-campus-sarala-birla-university-ranchi-india/"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${firaSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
