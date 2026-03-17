import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Lumifit
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            상품
          </Link>
          <Link href="/body-profile" className="text-muted-foreground hover:text-foreground transition-colors">
            체형 프로필
          </Link>
        </nav>
      </div>
    </header>
  );
}
