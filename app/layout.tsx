import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MultiGPT — shared AI work",
  description: "The collaborative workspace where AI conversations become project memory.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
