import { tenantStatusOptions } from "@lumifit/shared-types";

export default function HomePage() {
  return (
    <main>
      <h1>Lumifit Admin App</h1>
      <p>Initial admin scaffold for tenant onboarding and publishing flows.</p>
      <ul>
        {tenantStatusOptions.map((status) => (
          <li key={status}>{status}</li>
        ))}
      </ul>
    </main>
  );
}

