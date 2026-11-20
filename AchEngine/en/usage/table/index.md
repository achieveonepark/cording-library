> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# Table Loader — Overview

Table Loader downloads Google Sheets data, generates C# types, and bakes runtime data.


> **Optional package**
> 
> `com.cysharp.memorypack` is optional. When installed, baked data uses `.bytes`; otherwise it uses JSON.
> 


## Pipeline

```mermaid
flowchart LR
A[Google Sheets] --> B[Download CSV]
B --> C[Generate C#]
C --> D[Bake data]
D --> E[Resources]
E --> F[TableManager]
```

## Main settings

| Setting             | Description                                    |
| ------------------- | ---------------------------------------------- |
| Spreadsheet ID      | ID from the Google Sheets URL                  |
| CSV output path     | Download destination                           |
| Generated code path | C# output destination                          |
| Binary output path  | `.bytes` or `.json` destination                |
| Sheet list          | Sheet name, GID, and generated class name      |
| Automation          | Generate and bake automatically after download |

## Next steps

- [Settings & download](/AchEngine/en/usage/table/setup.md)
- [JSON → CSV export](/AchEngine/en/usage/table/json-to-csv.md)
- [Code generation & runtime](/AchEngine/en/usage/table/codegen.md)
