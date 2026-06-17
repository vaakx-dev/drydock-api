import type { disposable } from "./core.js";

export type workspace_dir_entry = {
  name: string;
  kind: "file" | "directory";
};

export type workspace_watch_info = {
  watch_id: string;
  workspace_id: string;
  relative_path: string;
};

export type workspace_watch_event = workspace_watch_info & {
  kind: "created" | "changed" | "deleted";
  message: string;
};

export type workspace_filesystem_api = {
  read_file(relative_path: string): Promise<string>;
  write_file(relative_path: string, contents: string): Promise<void>;
  list_dir(relative_path: string): Promise<workspace_dir_entry[]>;
  watch_path(relative_path: string, handler: (event: workspace_watch_event) => void): Promise<disposable>;
};
