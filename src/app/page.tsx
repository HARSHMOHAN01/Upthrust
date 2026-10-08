import { getSiteData } from "@/lib/content";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-brand-orange selection:text-white">
      {/* Structural scaffolding for Phase 1 */}
      <div className="py-20 text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-brand-orange">
          {data.hero.headlineTop} {data.hero.headlineAccent} {data.hero.headlineBottom}
        </h1>
        <p className="mt-4 text-zinc-600">{data.brand.tagline}</p>
      </div>
    </main>
  );
}
