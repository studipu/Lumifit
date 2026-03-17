# Lumifit API 계약 제안서

> **작성일**: 2026-03-17
> **작성자**: 팀장 / PM / Frontend Lead
> **목적**: 프론트엔드 ↔ 백엔드 API 인터페이스 합의를 위한 초안
> **상태**: 제안 (팀 리뷰 필요)

---

## 공통 규칙

### 응답 형식

```json
// 성공
{ "data": { ... }, "meta": { ... } }

// 에러
{ "error": { "code": "ERROR_CODE", "message": "사용자에게 보여줄 메시지" } }
```

### URL 규칙

- 소문자, kebab-case, 복수형: `/api/body-profiles`, `/api/products`
- 현재 사용자 리소스: `/me` 사용 (예: `/api/body-profiles/me`)

### HTTP 상태 코드

| 코드 | 의미 |
|---|---|
| 200 | 조회/수정 성공 |
| 201 | 생성 성공 |
| 400 | 요청 데이터 오류 (유효성 검증 실패) |
| 401 | 인증 필요 |
| 404 | 리소스 없음 |
| 500 | 서버 내부 오류 |

### 공유 타입 (packages/shared-types)

```typescript
type BodyShapeScale = "narrow" | "average" | "broad";
type LengthScale = "short" | "average" | "long";
type GenerationState = "queued" | "processing" | "completed" | "failed";

type ShopperProfile = {
  heightCm: number;       // 100~220
  weightKg: number;       // 30~200
  shoulderWidth: BodyShapeScale;
  torsoLength: LengthScale;
  hipSize: BodyShapeScale;
  bustSize: BodyShapeScale;
  waistToHipRatio: BodyShapeScale;
  legLength: LengthScale;
};
```

---

## 1. 체형 프로필 API

**담당**: Backend & Data Lead

### 1-1. 프로필 저장

```
POST /api/body-profiles
```

**Request Body:**

```json
{
  "heightCm": 168,
  "weightKg": 58,
  "shoulderWidth": "average",
  "torsoLength": "average",
  "hipSize": "broad",
  "bustSize": "average",
  "waistToHipRatio": "broad",
  "legLength": "long"
}
```

**Response (201 Created):**

```json
{
  "data": {
    "id": "bp_abc123",
    "heightCm": 168,
    "weightKg": 58,
    "shoulderWidth": "average",
    "torsoLength": "average",
    "hipSize": "broad",
    "bustSize": "average",
    "waistToHipRatio": "broad",
    "legLength": "long",
    "createdAt": "2026-03-17T09:00:00Z"
  }
}
```

**에러 케이스:**

| 상황 | 코드 | 메시지 예시 |
|---|---|---|
| 필수값 누락 | `VALIDATION_ERROR` | "heightCm은 필수입니다" |
| 범위 초과 | `VALIDATION_ERROR` | "heightCm은 100~220 범위여야 합니다" |
| 유효하지 않은 enum | `VALIDATION_ERROR` | "shoulderWidth는 narrow, average, broad 중 하나여야 합니다" |

### 1-2. 프로필 조회

```
GET /api/body-profiles/me
```

**Response (200):**

```json
{
  "data": {
    "id": "bp_abc123",
    "heightCm": 168,
    "weightKg": 58,
    "shoulderWidth": "average",
    "torsoLength": "average",
    "hipSize": "broad",
    "bustSize": "average",
    "waistToHipRatio": "broad",
    "legLength": "long",
    "createdAt": "2026-03-17T09:00:00Z"
  }
}
```

**프로필 없을 때 (404):**

```json
{ "error": { "code": "NOT_FOUND", "message": "프로필이 존재하지 않습니다" } }
```

### 1-3. 프로필 수정

```
PUT /api/body-profiles/me
```

- Request: 저장과 동일
- Response: 저장과 동일 (200)

---

## 2. 아바타 추천 API

**담당**: Backend & Data Lead

### 2-1. 추천 요청

```
POST /api/body-profiles/me/recommend-avatars
```

- Request Body: 없음 (서버가 현재 사용자 프로필 기반으로 추천)

**Response (200):**

```json
{
  "data": [
    {
      "id": "avatar_001",
      "label": "슬림한 체형",
      "imageUrl": "https://storage.lumifit.com/avatars/avatar_001.png",
      "bodyShape": {
        "heightCm": 166,
        "weightKg": 54,
        "shoulderWidth": "narrow",
        "torsoLength": "average",
        "hipSize": "narrow",
        "bustSize": "narrow",
        "waistToHipRatio": "narrow",
        "legLength": "long"
      }
    },
    {
      "id": "avatar_002",
      "label": "나와 비슷한 체형",
      "imageUrl": "https://storage.lumifit.com/avatars/avatar_002.png",
      "bodyShape": { "..." : "..." }
    },
    {
      "id": "avatar_003",
      "label": "풍성한 체형",
      "imageUrl": "https://storage.lumifit.com/avatars/avatar_003.png",
      "bodyShape": { "..." : "..." }
    }
  ]
}
```

**에러 케이스:**

| 상황 | 코드 | 메시지 예시 |
|---|---|---|
| 프로필 미설정 | `PROFILE_REQUIRED` | "체형 프로필을 먼저 설정해주세요" |

### 2-2. 아바타 선택 저장

```
PUT /api/body-profiles/me/selected-avatar
```

**Request Body:**

```json
{ "avatarId": "avatar_001" }
```

**Response (200):**

```json
{ "data": { "avatarId": "avatar_001" } }
```

---

## 3. 상품 API

**담당**: Backend & Data Lead

### 3-1. 상품 목록

```
GET /api/products?category=tops&page=1&limit=20
```

**Query Parameters:**

| 파라미터 | 필수 | 기본값 | 설명 |
|---|---|---|---|
| `category` | X | 전체 | jackets, tops, bottoms, dresses |
| `page` | X | 1 | 페이지 번호 |
| `limit` | X | 20 | 페이지당 개수 |

**Response (200):**

```json
{
  "data": [
    {
      "id": "prod_001",
      "name": "슬림핏 니트 탑",
      "description": "몸에 부드럽게 밀착되는 슬림핏 니트",
      "price": 59000,
      "currency": "KRW",
      "category": "tops",
      "imageUrls": ["https://storage.lumifit.com/products/prod_001_1.jpg"],
      "sizes": ["S", "M", "L"],
      "fitComparisonEnabled": true,
      "createdAt": "2026-02-01T09:00:00Z"
    }
  ],
  "meta": {
    "total": 48,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### 3-2. 상품 상세

```
GET /api/products/:productId
```

**Response (200):**

```json
{
  "data": {
    "id": "prod_001",
    "name": "슬림핏 니트 탑",
    "description": "몸에 부드럽게 밀착되는 슬림핏 니트",
    "price": 59000,
    "currency": "KRW",
    "category": "tops",
    "imageUrls": ["https://storage.lumifit.com/products/prod_001_1.jpg"],
    "sizes": ["S", "M", "L"],
    "fitComparisonEnabled": true,
    "createdAt": "2026-02-01T09:00:00Z"
  }
}
```

**에러 케이스:**

| 상황 | 코드 | 메시지 예시 |
|---|---|---|
| 존재하지 않는 상품 | `NOT_FOUND` | "상품을 찾을 수 없습니다" |

---

## 4. 3D 생성 API

**담당**: Backend & Generation Pipeline Lead

### 4-1. 캐시 조회 (생성 전 먼저 확인)

```
GET /api/generation-jobs?productId=prod_001&avatarId=avatar_001
```

**기존 결과 있을 때 (200):**

```json
{
  "data": {
    "id": "job_xyz",
    "productId": "prod_001",
    "avatarId": "avatar_001",
    "state": "completed",
    "resultUrl": "https://storage.lumifit.com/models/job_xyz.glb",
    "createdAt": "2026-03-17T09:00:00Z",
    "updatedAt": "2026-03-17T09:05:00Z"
  }
}
```

**기존 결과 없을 때 (200):**

```json
{ "data": null }
```

### 4-2. 생성 요청

```
POST /api/generation-jobs
```

**Request Body:**

```json
{
  "productId": "prod_001",
  "avatarId": "avatar_001"
}
```

**Response (201 Created):**

```json
{
  "data": {
    "id": "job_xyz",
    "productId": "prod_001",
    "avatarId": "avatar_001",
    "state": "queued",
    "resultUrl": null,
    "createdAt": "2026-03-17T10:00:00Z",
    "updatedAt": "2026-03-17T10:00:00Z"
  }
}
```

### 4-3. 상태 조회 (프론트에서 2초 간격 폴링)

```
GET /api/generation-jobs/:jobId
```

**상태 흐름:**

```
queued → processing → completed (resultUrl 포함)
                    → failed (errorMessage 포함)
```

**완료 시 (200):**

```json
{
  "data": {
    "id": "job_xyz",
    "state": "completed",
    "resultUrl": "https://storage.lumifit.com/models/job_xyz.glb",
    "updatedAt": "2026-03-17T10:05:00Z"
  }
}
```

**실패 시 (200):**

```json
{
  "data": {
    "id": "job_xyz",
    "state": "failed",
    "resultUrl": null,
    "errorMessage": "이미지 품질이 부족합니다",
    "updatedAt": "2026-03-17T10:03:00Z"
  }
}
```

---

## 5. 사용자 식별 방식

### 제안: 세션 쿠키 기반

| 항목 | 내용 |
|---|---|
| 방식 | 서버 세션 + 쿠키 (`Cookie: session=abc123`) |
| 이유 | 프론트에서 별도 토큰 관리 불필요, 브라우저가 자동 전송 |
| MVP 단계 | 게스트 세션 (비회원도 프로필 저장 가능) |
| 이후 확장 | 로그인 기능 추가 시 세션에 userId 연결 |

**미인증 시 응답 (401):**

```json
{ "error": { "code": "UNAUTHORIZED", "message": "로그인이 필요합니다" } }
```

---

## 합의 필요 항목 체크리스트

### Backend & Data Lead

- [ ] 체형 프로필 request/response 구조 확정
- [ ] 아바타 추천 로직 기준 확정 (어떤 알고리즘으로 3개 선정?)
- [ ] 상품 목록 페이지네이션 구조 확정
- [ ] 사용자 식별 방식 확정 (세션 쿠키 동의?)

### Backend & Generation Pipeline Lead

- [ ] generation job 생성 요청/응답 구조 확정
- [ ] job state 값 확정 (queued/processing/completed/failed)
- [ ] resultUrl 형식 확정 (GLB? GLTF? 파일 경로 규칙?)
- [ ] 캐시 조회 조건 확정 (productId + avatarId 조합)
- [ ] 실패 시 errorMessage 필드 포함 여부

### 공통

- [ ] packages/shared-types 타입 정의 리뷰
- [ ] 에러 코드 목록 통일
- [ ] 날짜 형식 통일 (ISO 8601: `2026-03-17T09:00:00Z`)

---

## 참고: 프론트엔드 현재 상태

- 모든 API 호출 지점에 mock 데이터가 구현되어 있음
- 백엔드 API 완성 후 `.env.local`에서 `NEXT_PUBLIC_USE_MOCK=false`로 전환하면 즉시 연동 가능
- 프론트엔드 컴포넌트 코드 변경 없이 hook 내부의 mock/real 분기만 전환
