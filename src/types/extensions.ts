import type { disposable, dispose_function, json_value } from "./core.js";
import type { window_api } from "./native_helpers.js";
import type { create_workspace_input, workspace_info } from "./workspace.js";
import type { HostAppApi } from "./app.js";
import type { HostDialogApi } from "./dialog.js";
import type { HostOpenerApi } from "./opener.js";
import type { host_task_api, runtime_ui_api } from "./runtime.js";

export type extension_package_ui = {
  entry: string;
  styles?: string[];
};

export type extension_package_export = {
  type: string;
};

export type extension_package_manifest = {
  name: string;
  version: string;
  type: "module";
  exports?: Record<string, { types: string }>;
  drydock: {
    id: string;
    api: string;
    host?: string;
    ui?: extension_package_ui;
    exports?: Record<string, extension_package_export>;
    imports?: Record<string, string[]>;
  };
};

export type extension_ui_entry = {
  id: string;
  entry_url?: string;
  style_urls: string[];
};

export type extension_summary = {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  ui_entries: extension_ui_entry[];
};

export type extension_error = {
  extension_id?: string;
  path?: string;
  message: string;
};

export type load_extensions_response = {
  workspace: workspace_info;
  extensions: extension_summary[];
  errors: extension_error[];
};

export type UiHostClient = {
  invoke<T = json_value>(method: string, payload?: json_value): Promise<T>;
  on(event: string, handler: (payload: json_value) => void): disposable;
};

export type DisposableScope = {
  add(disposable: disposable | dispose_function): disposable;
  dispose(): Promise<void>;
};

export type UiContext = runtime_ui_api & {
  extension_id: string;
  host: UiHostClient;
  window: window_api;
  subscriptions: DisposableScope;
};

export type ExportRegistry = {
  provide<T>(service_id: string, service: T): disposable;
};

export type ExtensionServiceClient = {
  use<T>(extension_id: string, service_id: string): Promise<T>;
};

export type UiBridge = {
  handle(method: string, handler: (payload?: json_value) => json_value | Promise<json_value>): disposable;
  emit(event: string, payload?: json_value): Promise<void>;
};

export type HostWorkspaceApi = {
  list(): Promise<workspace_info[]>;
  open(workspace_id_or_path: string): Promise<void>;
  create(input: create_workspace_input): Promise<workspace_info>;
};

export type HostContext = {
  extension_id: string;
  workspace: HostWorkspaceApi;
  dialog: HostDialogApi;
  opener: HostOpenerApi;
  app: HostAppApi;
  tasks: host_task_api;
  exports: ExportRegistry;
  extensions: ExtensionServiceClient;
  ui: UiBridge;
  subscriptions: DisposableScope;
};
