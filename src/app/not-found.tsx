import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <span className="text-brand-orange font-mono text-sm tracking-widest uppercase mb-2">
        Error 404
      </span>
      <h1 className="text-4xl sm:text-6xl font-black uppercase mb-4" style={{ fontFamily: "var(--font-syne)" }}>
        Page Not Found
      </h1>
      <p className="text-zinc-400 max-w-md text-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-orangeHover transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
