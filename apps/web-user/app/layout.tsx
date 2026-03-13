import type { ReactNode } from "react";

export const metadata = {
  title: "Lumifit Shopper",
  description: "Shopper-facing fit comparison experience",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

