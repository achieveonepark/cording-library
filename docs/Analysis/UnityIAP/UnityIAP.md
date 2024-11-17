# Unity IAP

결제 테스트까지의 과정을 기록했습니다.

## Android
>준비물 : 빌드에 사용할 keystore 

Google Play Console에 aab 파일을 게시하려면 keystore가 필요합니다.<br>
Project Settings에서 keystore를 만든 뒤, 아래 과정을 따라주세요.<br>
또한 만들어진 keystore는 절대 분실해선 안됩니다!


### Start
1. **Google Play Console에 테스트 할 프로젝트가 생성되어 있는지 확인하기**
2. **Google Play Console에 aab 파일을 업로드 하기 (테스트 단계는 중요하지 않음)**
3. **`수익 창출/제품/인앱 상품`에 테스트 할 상품을 등록하기**
4. **비공개 테스트로 승격 후 출시**
5. **출시 된 비공개 테스트 트랙의 `테스터/Android에서 참여`로 디바이스에서 설치 후 한번만 실행, 결제 테스트**
   - 이 과정이 진행된 이후에는 
>🔧 `상품을 찾을 수 없습니다` 에러가 나오는 경우
>- `Google Play Console/설정/라이선스 테스트`에 테스트 할 계정이 등록되어 있는지 확인합니다.
>- `4~5번 사항`이 수행 된 이후인지 확인해주세요.

## iOS
1. **App Store Connect에 테스트 할 프로젝트가 생성되어 있는지 확인하기**
2. **`수익화/앱 내 구입`에 테스트 할 상품을 등록하기**
   - 초안이어도 상관 없음
   - 승인되지 않아도 됨
   - `메타데이터 누락 됨` 표시도 테스트 가능 함
3. **App Store Connect -> 사용자 및 액세스 -> Sandbox에 테스트 계정을 생성하기**
4. **테스트 할 iOS 기기에 Sandbox 계정을 로그인하기**
   - [설정 -> App Store -> 샌드 박스 계정]
   - 로그인 시 이중 인증 관련 내용은 넘어가기
5. **처음 상품을 등록한 후 조금의 시간을 두고 테스트하기** 
   - 문서에는 `몇 분 ~ 몇 시간 내, 최대 24시간`이라하여 시간을 특정짓기 모호합니다.
     - 필자는 **5분 뒤**에 시도해보니 갱신이 되어있었습니다.

여기까지 세팅이 되었다면, 결제 테스트를 진행할 수 있습니다.