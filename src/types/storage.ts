import type { json_value } from "./core.js";

export type extension_storage = {
  get<T extends json_value = json_value>(key: string): Promise<T | null>;
  set<T extends json_value = json_value>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  keys(): Promise<string[]>;
};
