import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          나에게 맞는 핏,
          <br />
          <span className="text-primary">Lumifit</span>으로 확인하세요
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          간단한 체형 프로필 설정으로 비슷한 체형의 아바타에
          옷을 입혀보고, 3D로 확인해 보세요.
        </p>
        <div className="flex gap-4">
          <Link
            href="/body-profile"
            className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            체형 프로필 설정
          </Link>
          <Link
            href="/products"
            className="inline-flex h-11 items-center rounded-lg border bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            상품 둘러보기
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
