import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PTC Cubing Contest",
  description: "Created with v0",
  generator: "v0.dev",
  icons: {
    icon: "/images/PTC logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/images/PTC logo.jpg" type="image/jpeg" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
