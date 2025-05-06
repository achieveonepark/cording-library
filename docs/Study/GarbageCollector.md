# GarbageCollector

## GarbageCollector?
- 더 이상 사용하지 않는 객체를 찾아서 메모리에서 해제해 주는 시스템.
- C++의 delete, free()와 같은 개념이나, C#은 자동으로 수행해 줌
- 힙 메모리에 존재하면서 메모리를 관리 함
- 주로 새로운 객체를 new로 할당했을 때 메모리가 부족할 경우 호출 됨

## GC Alloc ...
- 힙 메모리에 새롭게 할당이 발생했다는 의미
- Unity Profiler의 GC Alloc과 같은 개념
- 잠재적 위험 경고 같은 개념
- GC가 일어났다는 의미는 아니고, 가능성이 생겼다는 의미.
```csharp
void Update()
{
    // 매 프레임마다 힙에 생성됨
    var list = new List<int>();
    list.Add(1);
}
```
- GC Alloc이 0인 상태가 가장 이상적인 상태이며, `GC-free frame`이 칭함

## Unity 개발자는 ...
- 힙 할당을 최소화하여 GC가 발생하지 않도록 하는 것이 올바른 메모리 관리법
- 힙 할당을 최소화한다 = 객체를 쓸데없이 많이 생성하지 않는다
- GC 발생은 메인 스레드에서 동작하므로 로직이 멈추게 되어 프레임 드랍 발생이 필연적

## 발생할 수 있는 다양한 사례들

### 문자열 연결
```csharp
string profile = "Level " + player.Level + " " + player.Nickname;
```
- 위와 같은 string의 + 연산자가 호출되면, 불변 객체 특성의 이유로 새로운 인스턴스를 계속 만들어내어 GC 발생 됨
- 결론 : StringBuilder를 쓰거나, 문자열 보간을 이용하자.


### LINQ
- 힙 할당의 블랙박스라 불림
- 성능이 예민할 경우에는 LINQ보다는 for, foreach로 순회하는 게 정석
```csharp
var result = list.Where(x => x.IsActive);
```
- 람다식이 포함되므로 힙에 delegate 객체가 생성 됨
- 호출 시마다 GC Alloc 발생 됨
- ToList, Select, OrderBy 등등의 LINQ 메소드는 새로운 컬랙션을 생성함, 그로 인한 힙 할당
- IEnumerator<T>를 사용하는데, 값 타입을 다룰 때 박싱이 발생 됨
```csharp
List<int> numbers = new ();
numbers.Where(x => x > 0;) // int -> object
```
- 결론 : 적절한 사용 시기는 한 번 실행하고 끝날 때나, 컴파일 타임 또는 로딩 시

### foreach
```csharp
foreach (Transform trf in transforms)
{
    // 
}
```
- Unity의 Transform 컴포넌트처럼 struct 기반 커스텀 Enumerator를 사용하는 경우, foreach 구문이 내부적으로 IEnumerator 인터페이스로 캐스팅하면서 박싱이 발생할 수 있음,
따라서 성능이 중요한 상황에서는 for 루프 사용이 권장된다.
- 일반적으로 구조체를 foreach로 순회할 때, 구조체가 IEnumerator 인터페이스로 변환되는 과정에서 박싱이 발생할 수 있음.
- 결론 : 참조형 클래스 순회, 컬렉션 크기가 작으며 구조적으로 명확하거나 제네릭 컬렉션을 순회할 때 안전하게 사용 가능함

### 람다식 및 익명 메서드
```csharp
button.onClick.AddListener(() => Debug.Log("Clicked"));
```
- 람다 내부에 캡처가 있으면 힙에 객체 생성 됨
- 캡처가 없더라도 Delegate 객체 생성 -> GC Alloc
- 결론 : 함수를 미리 정의, 그 함수 참조로 대체

### Instantiate / Destroy
- 너무나도 당연한 이야기지만 생성, 삭제를 직접 하는 경우에도 GC Alloc
- Destory는 실제 파괴가 프레임 뒤에 일어나며 메모리 정리도 늦게 진행되며 연속적으로 사용 시 GC 밀집 발생 (심한 프레임 드랍)
- 결론 : Pooling을 쓰자~