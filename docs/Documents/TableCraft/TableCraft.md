# Table Craft [문서 작성 중]
| [🪄github 바로가기][git]

아래 단계를 모두 제공합니다.
1. Table Class를 GUI에서 다루어 cs파일 제작
2. 생성 된 cs파일을 기반으로 GUI에서 테이블 데이터 제작
3. 입력 된 테이블 데이터를 압축, 암호화(AES 방식)하여 json 파일로 Export
4. Runtime에서 json 파일을 복호화, 압축을 풀고 Deserialize 하는 Loader

### API

이 패키지는 아래의 기능을 제공합니다.

    TableCraft.Load           | Data를 Load합니다. 

### GUI 사용 방법

1. 유니티 상단바의 `My Tools/Create C# Class`를 선택합니다.
[GUI 사용 방법 1]
2. `Class Name`을 입력 후 `Add Field` 버튼을 클릭하여 생성 할 변수명과 자료형을 선택합니다. (배열도 선택 가능)
3. `Create C# Class` 버튼을 클릭하면, `Assets/Resources` Path에 입력한 Class Name의 cs파일이 생성된 것을 확인할 수 있습니다.
4. 유니티 상단바의 `My Tools/Manage C# Tables`를 선택합니다.
[GUI 사용 방법 2]
5. 생성한 Class Name을 선택 후 Add Row를 선택하면 위와 같이 화면이 뜹니다.
6. 데이터를 입력 후 `Save To JSON` 버튼을 클릭하면 `Assets/Resources` Path에 Class Name과 동일한 파일이 생성됩니다.
[GUI 사용 방법 3]
7. 생성된 json 파일의 내용은 위와 같습니다.


### Dependencies
[Newtonsoft Json](https://github.com/needle-mirror/com.unity.nuget.newtonsoft-json#3.2.1) (3.2.1)


[git]: https://github.com/achieveonepark/TableCraft

[GUI 사용 방법 1]: ./Captures/capture1.png
[GUI 사용 방법 2]: ./Captures/capture2.png
[GUI 사용 방법 3]: ./Captures/capture3.png