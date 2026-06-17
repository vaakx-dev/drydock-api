import type { workspace_settings } from "./settings.js";

export type workspace_info = {
  id: string;
  title: string;
  icon?: string;
  extensions: string[];
  path: string;
};

export type create_workspace_input = {
  id: string;
  title: string;
};

export type workspace_api = {
  current(): Promise<workspace_info>;
  list(): Promise<workspace_info[]>;
  open(workspace_id_or_path: string): Promise<void>;
  create(input: create_workspace_input): Promise<workspace_info>;
  settings: workspace_settings;
};
