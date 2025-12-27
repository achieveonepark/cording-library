---
title: Game Loop
---

게임 루프는 모든 게임의 심장과 같은 핵심 구조입니다. 게임이 실행되는 동안 지속적으로 사용자 입력을 처리하고, 게임 상태를 업데이트하며, 그 결과를 화면에 렌더링하는 과정을 무한히 반복합니다.

### 왜 사용하는가?

- **실시간 상호작용:** 플레이어의 입력을 즉시 게임에 반영하여 살아있는 듯한 경험을 제공합니다.
- **지속적인 상태 관리:** 게임 월드의 모든 객체(캐릭터, 발사체, UI 등)가 각자의 규칙에 따라 계속해서 변화하고 움직이게 합니다.
- **분리된 처리 단계:** 입력, 업데이트, 렌더링 단계를 분리하여 코드를 더 명확하고 관리하기 쉽게 만듭니다.

### 간단한 구현 예제

아래는 게임 루프의 가장 기본적인 형태를 보여주는 C# 코드입니다.

```csharp
public class Game
{
    private bool isRunning = true;

    public void Run()
    {
        while (isRunning)
        {
            ProcessInput();
            Update();
            Render();
        }
    }

    private void ProcessInput()
    {
        // 사용자의 키보드, 마우스 입력을 처리합니다.
        // 예를 들어, 'ESC' 키가 눌리면 게임을 종료합니다.
        if (Console.KeyAvailable && Console.ReadKey(true).Key == ConsoleKey.Escape)
        {
            isRunning = false;
        }
    }

    private void Update()
    {
        // 게임의 상태를 업데이트합니다.
        // 예: 캐릭터의 위치 이동, 점수 계산 등
    }

    private void Render()
    {
        // 게임의 현재 상태를 화면에 그립니다.
        // 예: 캐릭터와 배경을 콘솔이나 그래픽 API를 통해 출력
    }
}

// 게임 시작
public class Program
{
    public static void Main(string[] args)
    {
        Game myGame = new Game();
        myGame.Run();
    }
}
```

### 고려사항

실제 게임에서는 프레임 속도(FPS)를 일정하게 유지하기 위해 `FixedUpdate` (물리 업데이트용)와 `Update` (로직 업데이트용)를 분리하고, 렌더링 시간을 조절하는 등 더 복잡한 기법들이 사용됩니다.
