import type { disposable, dispose_function, json_value } from "./core.js";

export type standard_view_area = "primary" | "sidebar" | "panel" | "overlay";

export type view_area = standard_view_area | (string & {});

export type view_state = "closed" | "open";

export type view_registration = {
  id: string;
  title: string;
  area?: view_area;
  icon?: string;
  open?(): void | disposable | dispose_function | Promise<void | disposable | dispose_function>;
  close?(): void | Promise<void>;
};

export type registered_view = {
  extension_id: string;
  id: string;
  global_id: string;
  title: string;
  area: view_area;
  icon?: string;
  state: view_state;
  focused: boolean;
};

export type view_api = {
  register(view: view_registration): disposable;
  list(): registered_view[];
  on_changed(handler: (views: registered_view[]) => void): disposable;
  open(id: string): Promise<void>;
  close(id: string): Promise<void>;
  focus(id: string): void;
};

export type task_state = "queued" | "running" | "done" | "failed" | "canceled";

export type task_output_stream = "stdout" | "stderr" | "log";

export type task_registration = {
  id: string;
  title: string;
  cancellable?: boolean;
};

export type task_output = {
  stream: task_output_stream;
  text: string;
};

export type registered_task = {
  extension_id: string;
  id: string;
  global_id: string;
  title: string;
  state: task_state;
  cancellable: boolean;
  progress?: number;
  error?: string;
  output: task_output[];
};

export type task_update = {
  state?: task_state;
  title?: string;
  progress?: number;
  error?: string;
};

export type task_controller = {
  id: string;
  global_id: string;
  update(update: task_update): void;
  write(output: task_output): void;
  finish(result?: { state?: Extract<task_state, "done" | "failed" | "canceled">; error?: string }): void;
  dispose(): void | Promise<void>;
};

export type task_api = {
  start(task: task_registration): task_controller;
  list(): registered_task[];
  on_changed(handler: (tasks: registered_task[]) => void): disposable;
};

export type host_task_api = {
  start(task: task_registration): task_controller;
};

export type workspace_state_api = {
  get<T extends json_value = json_value>(key: string): T | undefined;
  set(key: string, value: json_value): void;
  delete(key: string): void;
};

export type settings_api = {
  get<T extends json_value = json_value>(key: string): T | undefined;
  set(key: string, value: json_value): void;
  delete(key: string): void;
};

export type runtime_ui_api = {
  views: view_api;
  tasks: task_api;
  workspace_state: workspace_state_api;
  settings: settings_api;
};
