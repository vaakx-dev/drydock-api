import type { json_value } from "./core.js";

export type settings_scope = {
  get<T extends json_value = json_value>(key: string): Promise<T | null>;
  set<T extends json_value = json_value>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  all(): Promise<Record<string, json_value>>;
};

export type app_settings = settings_scope;

export type workspace_settings = settings_scope;

export type extension_settings = settings_scope;
