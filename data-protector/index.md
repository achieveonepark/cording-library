> For AI agents: the complete documentation index is available at /data-protector/llms.txt, the full documentation bundle is available at /data-protector/llms-full.txt.

# 소개

Data Protector는 `byte[]`와 `string` 데이터를 저장하기 전에 압축하고 암호화하여, 외부에서 쉽게 접근하지 못하도록 보호하는 패키지입니다.

## 주요 기능

- `byte[]`와 `string` 데이터의 압축 및 암호화
- 암호화에는 사용자가 제공하는 16바이트 문자열 키 사용
- `SHA256` 기반 해시 값을 생성·비교하여 파일 변경 여부 확인

## 동작 방식

- 데이터 보안에는 `AES-128` 암호화를 사용합니다.
- 압축은 C#의 `GZipStream`으로 처리하여 저장 공간을 효율적으로 사용합니다.

## 다음 단계

- [시작하기](/data-protector/getting-started.md) — 설치와 기본 사용법
- [API](/data-protector/api.md) — 전체 API 레퍼런스
