import { invoke } from "@tauri-apps/api/core";

// OS 키체인에 보관하는 비밀값 키 이름.
export const KEY_TOKEN = "github_token";
export const KEY_CLIENT_ID = "github_client_id";

export const getSecret = (key: string) => invoke<string | null>("get_secret", { key });
export const setSecret = (key: string, value: string) =>
  invoke<void>("set_secret", { key, value });
export const clearSecret = (key: string) => invoke<void>("clear_secret", { key });
