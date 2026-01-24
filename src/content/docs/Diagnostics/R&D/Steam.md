---
title: Steam
---
# Steam

Steam을 연동하기까지의 내용을 기록했습니다.

## Steam 계정 만들기

- 진행하기 전, Steam 개발자용 계정이 필요함.
- Steam 클라이언트를 설치 후 로그인을 진행. 테스트 시에는 클라이언트가 항상 켜져있어야 함.

## Steamworks.NET
- Steam은 Unity용 공식 SDK를 제공하지 않기 때문에, C# 환경에서 Steamworks 기능을 사용할 수 있도록 외부 개발자가 제작한 Steamworks.NET 패키지를 사용.
- [Steamworks.NET](https://github.com/rlabrecque/Steamworks.NET-Test) Test 레포지토리를 먼저 참조해보시면, 사용 시 이해가 더 빠를 수 있음.

## SteamManager.cs 프로젝트에 포함하기

### SteamManager?
- Unity 앱 구동 시 Steamworks.NET의 초기화와 종료를 관리하며, 매 프레임마다 Steam API 콜백을 처리하는 역할을 수행함.
- Steamworks.NET 패키지 개발자가 제공하는 예제 코드이며, Steamworks.NET SteamManager 문서를 참조.

### 사용하기
- [SteamManager.cs](https://raw.githubusercontent.com/rlabrecque/SteamManager/master/SteamManager.cs) 파일을 Assets 폴더 내에 위치시키기.
- SteamManager 내부 if (SteamAPI.RestartAppIfNecessary(AppId_t.Invalid)) 요 코드에 발급받은 AppId를 입력.
- 시작 점이 되는 Scene에 SteamManager 컴포넌트를 추가.

## 빌드하기

### 일반 설치 설정하기
- Steam Client에서 게임 빌드를 다운로드 / 설치한 후에 실행 할 파일명을 작성해야 함.
- 운영 체제를 참고하시어 아래처럼 세팅해주면 됨.
- 실행 파일 필드에 꼭! 유니티의 아래 필드와 동일하게 설정.
  - {Project Settings/Player/Product Name}.exe

### 디포 추가하기
1. SteamPipe/디포에 접근하여 하단 새로운 디포 추가 버튼을 클릭.
2. 디포 이름 설정 후 확인을 선택. ID는 처음 만드는 디포라면 appID에서 +1, 그 이후는 마지막 생성 된 디포 ID의 +1된 값이 default로 들어 감.
3. 새로 생긴 디포에 값을 설정. 예시는 Windows와 Mac을 따로 나누는 디포로 설정 및 생성함.
4. 저장을 꼭 누른 후에 다시 앱 관리 상단 페이지로 돌아와서 아래 항목을 클릭.
5. 상점 패키지의 패키지 타이틀을 클릭.
6. 포함 된 디포 항목에서 위에 추가한 디포를 추가해주면 완료.

### Branch 추가하기
1. `새로운 앱 브랜치 생성하기` 를 선택 후 생성 할 브랜치 이름을 작성.
2. 설명 : 이 브랜치가 어떻게 사용 될 것인지? 비밀번호 : 입력하면 비공개, 빈 칸이면 공개 테스트
3. 갱신을 클릭하면 새 브랜치가 적용됩니다.

## windows 빌드 ...

## 업로드 이후 동작
1. 올라간 빌드가 잘 업로드 되었는지 확인.
2. Steam 클라이언트를 실행하여 라이브러리에 들어가서 테스트 클라이언트 우클릭 후 속성을 클릭.
3. 베타 탭에 생성 및 업로드까지 완료한 Branch가 존재할 것인데, 이를 선택.
4. 업데이트를 진행 후 게임을 시작.