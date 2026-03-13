import { demoShopperProfile } from "@lumifit/shared-types";

export default function HomePage() {
  return (
    <main>
      <h1>Lumifit Shopper App</h1>
      <p>Initial storefront scaffold for fit comparison flows.</p>
      <pre>{JSON.stringify(demoShopperProfile, null, 2)}</pre>
    </main>
  );
}

