import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kreative Catalyst | Premium Creative Agency",
  description: "We transform bold ideas into unforgettable digital experiences. Branding, design, and development that moves people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
