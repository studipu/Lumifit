# 팀 운영 문서

## 팀 구성 및 역할 분담

| 이름/역할 | 담당 영역 | 주요 책임 | 핵심 산출물 |
|---|---|---|---|
| 팀장 / PM / Frontend Lead / 통합 리드 | 기획, 사용자 웹, 통합, 품질 관리 | PRD/아키텍처 관리, 범위 조정, 사용자 핵심 흐름 구현, API/데이터 구조 승인, 전체 QA, 발표 총괄 | PRD, 아키텍처, 사용자 웹 핵심 화면, 통합 시나리오, 발표 자료 |
| Backend & Data Lead | API, DB, 비즈니스 로직 | DB 스키마 설계, 체형 프로필 API, 상품 API, 아바타 추천 로직, 결과 조회/재사용 로직 구현 | DB 스키마, API 서버, 데이터 모델 |
| Backend & Generation Pipeline Lead | 3D 생성 파이프라인 | VARCO 연동, generation worker, queue, Redis, generation status lifecycle, 실패 처리/재시도 구현 | 생성 파이프라인, worker, job 처리 구조 |
| DevOps & Admin Support Lead | 배포, 운영, 관리자 기능 지원 | Kubernetes, object storage, 환경 변수/시크릿 관리, 로깅/모니터링, 관리자 기능 일부 지원 | 배포 환경, 운영 구조, 관리자 기능 일부 |

## 재편성된 주차별 개발 일정표

| 주차 | 팀장 / PM / Frontend Lead / 통합 리드 | Backend & Data Lead | Backend & Generation Pipeline Lead | DevOps & Admin Support Lead |
|---|---|---|---|---|
| 1주차 | PRD, 아키텍처, 사용자 흐름 확정 | 엔티티/API 초안 작성 | 생성 파이프라인 요구사항 정리 | 배포 구조 초안 작성 |
| 2주차 | 사용자 웹 와이어프레임, 화면 구조 정리 | DB 스키마, 프로필/상품 API 설계 | worker/queue 설계 | Kubernetes, storage, env 구조 설계 |
| 3주차 | 체형 입력, 2D 아바타 선택 UI 구현 | 프로필 저장, 아바타 추천 API 구현 | VARCO 연동 실험, job 생성 구조 구현 | 로컬/개발 배포 환경 구성 |
| 4주차 | 상품 목록/상세, `3D로 보기` UI 구현 | 상품 상세/생성 요청/조회 API 구현 | generation lifecycle 구현 | object storage 연결, 기본 운영 화면 보조 |
| 5주차 | 생성 중/완료 UI, 3D 뷰어 연결 | 결과 저장/재사용 로직 구현 | 온디맨드 생성 파이프라인 완성 | 배포 안정화, 관리자 기능 보조 |
| 6주차 | 사용자 흐름 polish, 통합 점검 | 관리자용 API, 예외 처리 보강 | 실패 처리/재시도/로그 보강 | 관리자 페이지 일부, 모니터링 연결 |
| 7주차 | 전체 QA, 발표 흐름 정리 | API 안정화, 시연 데이터 준비 | 파이프라인 안정화 | 데모 배포 환경 최종 점검 |
| 8주차 | 발표 자료, 리허설, 최종 통합 | 시연용 백엔드 상태 유지 | 시연용 생성 흐름 유지 | 최종 배포 및 장애 대응 준비 |

## 협업 포인트

### 팀장 ↔ Backend & Data Lead
먼저 고정할 것:
- 체형 프로필 request/response
- 2D 아바타 추천 응답
- 상품 상세 응답 구조

### Backend & Data Lead ↔ Backend & Generation Pipeline Lead
먼저 고정할 것:
- generation job 생성 API
- job status 모델
- result metadata 구조
- cache hit 여부 필드

### Backend & Generation Pipeline Lead ↔ DevOps & Admin Support Lead
먼저 고정할 것:
- queue 연결 방식
- worker 실행 환경
- storage 경로 정책
- secret/env 관리 방식

### 팀장 ↔ DevOps & Admin Support Lead
먼저 고정할 것:
- 관리자 페이지 범위
- 데모 배포 URL 구조
- 시연 시 fallback 화면

## 공통 협업 규칙

| 항목 | 내용 |
|---|---|
| 공통 데이터 구조 | 체형 프로필, 2D 아바타 응답, 3D 생성 응답 구조를 먼저 고정 |
| 통합 기준 | `상품-아바타-옵션` 조합 키를 공통 규칙으로 사용 |
| 커뮤니케이션 | API 변경은 즉시 공유, 주 1회 통합 점검 |
| 우선순위 | 사용자 핵심 흐름인 `체형 입력 -> 아바타 선택 -> 상품 상세 -> 3D 생성`을 최우선 구현 |
| 발표 준비 | 6주차부터 시연 흐름과 발표 역할을 병행 정리 |
| QA 방식 | 매주 말 실제 실행 가능한 데모 기준으로 점검 |

## 발표용 역할 소개 문구

- 팀장 / PM / Frontend Lead / 통합 리드: 제품 기획, 사용자 경험 설계, 프론트엔드 구현, 전체 통합 및 발표 총괄 담당
- Backend & Data Lead: 백엔드 API와 데이터 구조 설계 및 핵심 비즈니스 로직 구현 담당
- Backend & Generation Pipeline Lead: 3D 생성 파이프라인, 외부 API 연동, 비동기 처리 구조 구현 담당
- DevOps & Admin Support Lead: 배포 환경, 인프라 운영, 관리자 기능 지원 및 서비스 안정화 담당
