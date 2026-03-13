---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - /Users/seungu/Desktop/project/Lumifit/_bmad-output/planning-artifacts/prd.md
  - /Users/seungu/Desktop/project/Lumifit/_bmad-output/brainstorming/brainstorming-session-2026-03-13-11-35-20.md
workflowType: 'architecture'
project_name: 'Lumifit'
user_name: 'Seungu'
date: '2026-03-13'
lastStep: 8
status: 'complete'
completedAt: '2026-03-13'
---

# 아키텍처 의사결정 문서

## 프로젝트 컨텍스트 분석

### 요구사항 개요

**기능 요구사항**

PRD 기준으로 Lumifit은 다음 7개 capability 영역으로 구성된다.

- 테넌트 및 접근 관리
- 상품 및 자산 온보딩
- 자산 관리 및 발행
- 쇼퍼 체형 프로파일
- 유사 체형 매칭
- 쇼퍼용 비교 경험
- 분석 및 운영 관리

기능적으로 가장 중요한 흐름은 다음과 같다.

1. 브랜드 운영자가 상품과 모델 이미지를 업로드한다.
2. 쇼퍼는 키/몸무게와 6개 체형 속성의 3단계 선택형 프로파일을 입력한다.
3. 시스템은 2D 유사 체형 아바타 3개를 제시한다.
4. 쇼퍼가 상품 상세에서 `3D로 보기`를 누르면 기존 생성 결과를 먼저 조회한다.
5. 저장된 결과가 없을 경우에만 온디맨드 3D 생성 작업을 시작한다.
6. 생성 완료 후 결과를 저장하고 이후 동일 조건 요청에는 재사용한다.

**비기능 요구사항**

아키텍처를 강하게 제약하는 NFR은 아래와 같다.

- PDP 경험에 맞는 빠른 2D 비교 응답
- 비동기 3D 생성 상태의 명확한 가시성
- 상품-아바타 조합 단위 결과 저장 및 재사용
- 멀티테넌트 격리
- 역할 기반 접근 제어
- 오브젝트 스토리지 기반 자산 관리
- 확장 가능한 비동기 워커 구조
- 장애 시 우아한 저하 처리

### 규모 및 복잡도

- 주요 도메인: 패션 이커머스 / B2B SaaS / 시각화 파이프라인
- 복잡도 수준: 중간
- 핵심 기술 난점:
  - 멀티테넌시
  - 온디맨드 비동기 생성
  - 생성 결과 재사용 전략
  - 스토어프론트 임베드 전달
  - 프론트/백엔드/워커/스토리지 분리

예상되는 핵심 아키텍처 컴포넌트는 다음과 같다.

- 사용자 웹 앱
- 관리자 웹 앱
- API 백엔드
- 3D 생성 워커
- 유사 체형 매칭 로직
- 분석 이벤트 수집 계층
- 관계형 데이터 저장소
- 오브젝트 스토리지
- 큐 및 캐시 계층
- Kubernetes 배포 계층

### 기술 제약 및 의존성

- VARCO `2D image -> 3D asset` API 연동이 필수다.
- 생성 결과는 상품-아바타-옵션 조합 기준으로 중복 생성을 피해야 한다.
- 3D는 모든 단계에서 즉시 생성하지 않고 상품 관심 시점에만 호출해야 한다.
- 사용자 체형 입력은 수치 기반이 아니라 3단계 선택형 UI여야 한다.

### 식별된 공통 관심사

- 인증/인가
- 멀티테넌트 데이터 분리
- 자산 업로드와 상태 추적
- 비동기 잡 처리
- 캐시 키 정책
- 분석 이벤트 추적
- 운영자 가시성 및 재시도
- 장애 대응 및 관측 가능성

## 스타터 템플릿 평가

### 주요 기술 도메인

이 프로젝트는 `풀스택 웹 + 관리자 웹 + API 백엔드 + 비동기 워커` 구조다. 단일 스타터보다는 모노레포 기반의 다중 애플리케이션 구성이 더 적합하다.

### 검토한 옵션

1. 단일 Next.js 풀스택 앱
- 장점: 초기 진입이 빠름
- 단점: 관리자 웹, 공개 웹, 온디맨드 워커, 장기적 멀티테넌시 분리가 약함

2. 단일 NestJS 백엔드 + 정적 프론트 별도 구성
- 장점: API 중심 설계에 유리
- 단점: 사용자 웹/관리자 웹의 UI 구조를 분리해 운영하기엔 보조 도구가 더 필요함

3. pnpm 모노레포 + Next.js 다중 앱 + NestJS API + Worker
- 장점: 공개 웹/관리자 웹/API/워커를 명확히 분리 가능
- 장점: 패키지 공유, 타입 공유, Kubernetes 배포 단위 분리가 쉬움
- 장점: 수업 프로젝트 데모와 실서비스형 구조를 동시에 설명하기 좋음
- 단점: 초기 설정이 단일 앱보다 복잡함

### 선택한 스타터 방식

**선택:** `pnpm workspace` 기반 모노레포 + `Next.js` 프론트엔드 2개 + `NestJS` API + 별도 Worker

**선정 이유**

- 사용자 웹과 관리자 웹의 관심사를 분리할 수 있다.
- API 서버와 생성 워커를 별도 서비스로 운영할 수 있다.
- 패키지 공유 구조를 통해 타입, UI, SDK, 공통 유틸을 재사용할 수 있다.
- 이후 Kubernetes에서 앱별 독립 배포가 가능하다.

### 권장 초기화 명령

```bash
pnpm create next-app@latest apps/web-user --ts --app --tailwind --eslint
pnpm create next-app@latest apps/web-admin --ts --app --tailwind --eslint
nest new apps/api --package-manager pnpm
```

### 검증한 기반 기술

- Next.js: 16.1.x 계열
- Node.js: 20.9.0 이상 권장
- NestJS: 11.x 계열
- PostgreSQL: 17 계열
- Redis: 8.x 계열
- Kubernetes: 1.34.x 계열

### 스타터가 제공하는 주요 결정

**언어 및 런타임**

- TypeScript 전면 적용
- Node.js 기반 서버 및 워커 런타임

**스타일링**

- Tailwind CSS 기반 UI 개발
- 사용자 웹과 관리자 웹의 스타일 시스템 분리 가능

**빌드 도구**

- Next.js App Router 기반 빌드
- Nest CLI 기반 API 프로젝트 구조
- pnpm workspace 기반 패키지 관리

**테스트 기반**

- 프론트엔드: Vitest 또는 Jest + Testing Library
- 백엔드: Jest
- E2E: Playwright

## 핵심 아키텍처 결정

### 우선순위 분석

**구현을 막는 핵심 결정**

- 모노레포 기반 다중 앱 구조 채택
- 멀티테넌트 SaaS 아키텍처 채택
- PostgreSQL + Redis + S3 호환 오브젝트 스토리지 조합 채택
- 온디맨드 3D 생성 + 결과 재사용 전략 채택
- NestJS API + 별도 Worker 분리
- Kubernetes 배포 구조 채택

**아키텍처를 크게 좌우하는 중요 결정**

- 사용자 웹과 관리자 웹 분리
- REST API 우선
- 캐시 키 표준화
- 이벤트 기반 분석 수집
- 테넌트 범위 RBAC

**MVP 이후로 미루는 결정**

- GraphQL
- 멀티 리전 배포
- 실시간 스트리밍 업데이트
- 브랜드 간 공용 쇼퍼 프로필 연합

### 데이터 아키텍처

**주 데이터베이스:** PostgreSQL 17

선정 이유:

- 멀티테넌트 관계형 데이터 모델에 적합
- 상품, 아바타, 생성 잡, 발행 설정, 분석 메타데이터를 구조적으로 다루기 좋음
- 트랜잭션과 인덱싱 전략이 중요함

**캐시 및 큐:** Redis 8

사용 목적:

- 잡 큐 백엔드
- 생성 상태 캐시
- 결과 조회 캐시
- 짧은 TTL의 PDP 요청 최적화

**오브젝트 스토리지:** S3 호환 스토리지

사용 목적:

- 업로드 원본 이미지 저장
- 생성된 3D 자산 저장
- 썸네일/미리보기 자산 저장

**데이터 모델링 전략**

- `tenant_id`를 모든 주요 비즈니스 엔터티의 1급 키로 포함
- 생성 결과는 `product_id + avatar_id + option_hash + generator_version` 조합으로 식별
- 쇼퍼 프로필은 수치형 상세 측정이 아닌 선택형 enum 필드 중심으로 저장

### 인증 및 보안

**관리자 인증**

- 이메일/비밀번호 기반 로그인
- JWT + 리프레시 토큰 또는 세션 기반 인증
- 테넌트 범위 RBAC 적용

**쇼퍼 인증**

- MVP에서는 비회원 사용 허용
- 체형 프로필은 브라우저 세션 + 선택적 계정 저장 지원

**보안 전략**

- 관리자 API와 쇼퍼 API의 인증 정책 분리
- 개인정보 최소 수집
- 민감 데이터 암호화 저장
- 테넌트 경계 기반 접근 제어

### API 및 통신 패턴

**API 스타일:** REST

선정 이유:

- 공개 웹, 관리자 웹, 위젯 전달, 비동기 상태 조회에 적합
- 수업 프로젝트와 이후 구현 단계에서 이해와 테스트가 쉬움

**주요 패턴**

- 동기 API: 상품 조회, 프로필 저장, 아바타 추천, 생성 결과 조회
- 비동기 API: 3D 생성 요청, 상태 조회, 재시도 요청
- 내부 서비스 통신: API -> Redis Queue -> Worker -> Storage/DB

**오류 처리**

- 표준 에러 응답 포맷 사용
- 사용자용 메시지와 운영자용 상세 코드를 구분

### 프론트엔드 아키텍처

**사용자 웹**

- 랜딩
- 체형 프로필 입력
- 2D 아바타 선택
- 쇼룸/상품 목록
- 상품 상세
- 3D 생성 상태 및 결과 뷰어

**관리자 웹**

- 로그인
- 대시보드
- 상품 관리
- 이미지 업로드
- 생성 상태 관리
- 기본 분석 리포트

**상태 관리 전략**

- 서버 상태: React Query/TanStack Query
- 로컬 UI 상태: React state
- 폼 상태: React Hook Form

### 인프라 및 배포

**런타임**

- Kubernetes 클러스터에 각 앱을 독립 배포
- Ingress를 통해 사용자 웹/관리자 웹/API 진입점 분리

**배포 단위**

- `web-user`
- `web-admin`
- `api`
- `worker-generation`
- `redis`
- `postgres`
- `object-storage` 또는 외부 매니지드 스토리지

**관측 가능성**

- 애플리케이션 로그 수집
- 잡 실패율, 처리 시간, 캐시 적중률, PDP 3D 요청률 모니터링
- tenant 단위 주요 지표 추적

## 구현 패턴 및 일관성 규칙

### 네이밍 규칙

**데이터베이스**

- 테이블명: snake_case 복수형
- 컬럼명: snake_case
- 기본키: `id`
- 외래키: `{entity}_id`

**API**

- 엔드포인트: kebab-case + 복수형 리소스
- 예: `/api/products`, `/api/body-profiles`, `/api/generation-jobs/:id`

**코드**

- React 컴포넌트 파일: PascalCase
- 함수/변수: camelCase
- 디렉터리: kebab-case

### 구조 규칙

- 앱별 코드는 `apps/` 하위에만 둔다.
- 공유 타입, UI, SDK, 공통 유틸은 `packages/`에 둔다.
- 비즈니스 도메인 모듈은 API에서 feature 기준으로 분리한다.
- 테스트는 해당 앱 내부에 co-located 또는 `tests/` 디렉터리로 일관되게 배치한다.

### 포맷 규칙

**API 응답**

성공:

```json
{
  "data": {},
  "meta": {}
}
```

실패:

```json
{
  "error": {
    "code": "GENERATION_NOT_FOUND",
    "message": "사용자 노출용 메시지"
  }
}
```

**날짜 포맷**

- API 외부 응답은 ISO 8601 UTC 문자열

### 커뮤니케이션 규칙

- 생성 잡 이벤트명은 `generation.job.created`, `generation.job.completed`, `generation.job.failed` 형식 사용
- 분석 이벤트명은 `widget.viewed`, `avatar.selected`, `generation.requested`, `generation.completed` 형식 사용

### 프로세스 규칙

- 3D 생성 요청은 항상 `lookup -> enqueue -> poll/fetch result` 순서를 따른다.
- 동일 조합 키가 존재하면 절대 재생성하지 않고 기존 결과를 반환한다.
- 쇼퍼 UX에서는 생성 실패 시 재시도보다 fallback 메시지와 2D 비교 유지가 우선이다.

## 프로젝트 구조 및 경계

### 전체 디렉터리 구조

```text
Lumifit/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── apps/
│   ├── web-user/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── src/
│   │       ├── app/
│   │       ├── components/
│   │       ├── features/
│   │       ├── lib/
│   │       └── styles/
│   ├── web-admin/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── src/
│   │       ├── app/
│   │       ├── components/
│   │       ├── features/
│   │       └── lib/
│   ├── api/
│   │   ├── package.json
│   │   ├── nest-cli.json
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── config/
│   │       ├── common/
│   │       ├── modules/
│   │       │   ├── auth/
│   │       │   ├── tenants/
│   │       │   ├── products/
│   │       │   ├── body-profiles/
│   │       │   ├── avatars/
│   │       │   ├── generations/
│   │       │   ├── analytics/
│   │       │   └── assets/
│   │       └── database/
│   └── worker-generation/
│       ├── package.json
│       └── src/
│           ├── main.ts
│           ├── jobs/
│           ├── services/
│           └── clients/
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── sdk/
│   └── utils/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── fixtures/
├── infra/
│   ├── docker/
│   ├── k8s/
│   │   ├── base/
│   │   ├── overlays/dev/
│   │   └── overlays/prod/
│   └── helm/
└── docs/
    └── architecture/
```

### API 경계

**외부 API**

- 쇼퍼용 API
  - 체형 프로필 저장/조회
  - 2D 아바타 추천
  - 상품 조회
  - 3D 생성 요청 및 결과 조회

- 관리자용 API
  - 인증
  - 상품 CRUD
  - 이미지 업로드
  - 생성 잡 상태 조회
  - 발행 설정
  - 분석 조회

**내부 경계**

- API는 Worker에 직접 작업하지 않고 큐만 발행
- Worker만 VARCO API 호출
- API는 DB와 스토리지 메타데이터만 직접 다룸

### 서비스 경계

- `auth`: 관리자 인증/인가
- `tenants`: 브랜드 조직 및 사용자 권한
- `products`: 상품 메타데이터 및 발행 상태
- `body-profiles`: 쇼퍼 프로파일 저장
- `avatars`: 유사 체형 추천
- `generations`: 조회, 캐시 키, 잡 생성, 상태 관리
- `assets`: 업로드/스토리지 메타데이터
- `analytics`: 이벤트 수집 및 지표 집계

### 요구사항 매핑

**테넌트 및 접근 관리**
- 위치: `apps/api/src/modules/auth`, `apps/api/src/modules/tenants`, `apps/web-admin/src/features/auth`

**상품 및 자산 온보딩**
- 위치: `apps/api/src/modules/products`, `apps/api/src/modules/assets`, `apps/web-admin/src/features/products`

**쇼퍼 체형 프로파일**
- 위치: `apps/api/src/modules/body-profiles`, `apps/web-user/src/features/body-profile`

**유사 체형 매칭**
- 위치: `apps/api/src/modules/avatars`, `apps/web-user/src/features/avatar-selection`

**온디맨드 3D 생성**
- 위치: `apps/api/src/modules/generations`, `apps/worker-generation/src/jobs`, `apps/web-user/src/features/generation-viewer`

**분석**
- 위치: `apps/api/src/modules/analytics`, `apps/web-admin/src/features/analytics`

## 아키텍처 검증 결과

### 일관성 검증

**결정 간 호환성**

- Next.js 프론트엔드 2개 + NestJS API + 별도 Worker 구조는 모노레포와 잘 맞는다.
- PostgreSQL/Redis/Object Storage 조합은 비동기 생성 + 결과 재사용 + 멀티테넌시를 충분히 지원한다.
- Kubernetes 기반 독립 배포와도 구조 충돌이 없다.

**패턴 일관성**

- API 포맷, 이벤트 명, 캐시 키 정책, 파일 구조가 전 컴포넌트에 걸쳐 일관되게 정의되었다.
- `lookup before generate` 규칙이 프론트/API/워커에 공통 적용된다.

### 요구사항 커버리지 검증

**기능 요구사항**

- 테넌트 관리: 지원됨
- 상품 온보딩: 지원됨
- 자산 발행: 지원됨
- 쇼퍼 프로파일: 지원됨
- 2D 유사 체형 비교: 지원됨
- 온디맨드 3D 생성: 지원됨
- 결과 저장/재사용: 지원됨
- 분석 및 운영 가시성: 지원됨

**비기능 요구사항**

- 성능: 2D 우선 렌더링 + 비동기 생성으로 대응
- 보안: 테넌트 격리 + RBAC + 암호화로 대응
- 확장성: 앱/워커 분리 및 큐 구조로 대응
- 접근성: 프론트엔드 설계 기준으로 반영 가능
- 신뢰성: 잡 상태 추적 및 재시도 구조로 대응

### 구현 준비도 검증

- 구현에 필요한 서비스 경계가 정의되었다.
- 디렉터리 구조가 구체적이다.
- 충돌 가능성이 높은 네이밍/응답/이벤트 규칙이 정의되었다.
- AI 에이전트가 병렬 구현하더라도 충돌 없이 맞출 수 있는 수준의 구조를 제공한다.

### 갭 분석

**현재 남은 중요 세부 설계**

- 유사 체형 추천 알고리즘의 구체 점수화 방식
- 상품 카테고리별 가중치 상세 정책
- 관리자 분석 대시보드의 KPI 정의 세부화
- 3D 뷰어 라이브러리 최종 선택

이 항목들은 구현 전 추가 설계가 필요하지만, 현재 아키텍처를 막는 수준의 공백은 아니다.

## 완료 및 핸드오프

이 문서는 Lumifit의 구현을 위한 단일 기술 기준 문서다. 이후 단계에서는 이 문서를 기준으로:

1. UX 명세 작성
2. 에픽/스토리 분해
3. 실제 구현

을 진행해야 한다.

특히 아래 원칙은 구현 동안 유지해야 한다.

- 체형 선택은 2D 비교 우선
- 3D는 상품 관심 시점에만 온디맨드 생성
- 동일 상품-아바타 조합은 항상 재사용 우선
- 공개 사용자 웹과 관리자 웹은 분리
- 생성 워커는 API와 분리

이 아키텍처는 수업 프로젝트 기준으로도 충분히 설명 가능하며, 실제 서비스형 구조로 확장 가능한 기반을 제공한다.
