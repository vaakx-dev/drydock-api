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

export type extension_service_runtime = "host";

export type extension_package_service = {
  contract: string;
  version: string;
  runtime: extension_service_runtime;
};

export type extension_package_import = {
  from: string;
  version: string;
  required?: boolean;
};

export type extension_package_manifest = {
  name: string;
  version: string;
  type: "module";
  drydock: {
    id: string;
    api: string;
    host?: string;
    ui?: extension_package_ui;
    services?: Record<string, extension_package_service>;
    imports?: Record<string, extension_package_import>;
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

export type command_registration = {
  id: string;
  title: string;
  description?: string;
  category?: string;
};

export type command_list_item = command_registration & {
  source_extension_id: string;
};

export type command_run_result = {
  command_id: string;
};

export type command_changed_event = {
  reason: "registered" | "unregistered" | "cleared";
  command_id?: string;
};

export type command_capabilities = {
  run(input: { command_id: string }): void | Promise<void>;
};

export type command_api = {
  register(command: command_registration, capabilities: command_capabilities): disposable;
  unregister(input: { command_id: string }): void;
  list(): command_list_item[];
  run(input: { command_id: string }): Promise<command_run_result>;
  on_changed(handler: (event: command_changed_event) => void): disposable;
};

export type service_method = (...args: json_value[]) => json_value | Promise<json_value>;

export type ServiceRegistry = {
  provide<T extends Record<string, service_method>>(service_id: string, service: T): disposable;
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

export type HostContext<Imports extends Record<string, unknown> = Record<string, unknown>> = {
  extension_id: string;
  workspace: HostWorkspaceApi;
  dialog: HostDialogApi;
  opener: HostOpenerApi;
  app: HostAppApi;
  tasks: host_task_api;
  commands: command_api;
  services: ServiceRegistry;
  imports: Imports;
  ui: UiBridge;
  subscriptions: DisposableScope;
};

export type CommandRegistration = command_registration;
export type CommandListItem = command_list_item;
export type CommandRunResult = command_run_result;
export type CommandChangedEvent = command_changed_event;
export type CommandCapabilities = command_capabilities;
export type CommandApi = command_api;
