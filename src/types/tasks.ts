import type { disposable } from "./core.js";

export type task_status = "running" | "exited" | "stopped" | "failed";

export type start_task_request = {
  title: string;
  command: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
};

export type task_info = {
  task_id: string;
  title: string;
  command: string;
  args: string[];
  cwd?: string;
  status: task_status;
  exit_code?: number;
  error?: string;
};

export type task_output_event = {
  task_id: string;
  stream: "stdout" | "stderr";
  line: string;
};

export type task_status_event = {
  task_id: string;
  status: task_status;
  exit_code?: number;
  error?: string;
};

export type task_registry = {
  start(request: start_task_request): Promise<task_info>;
  stop(task_id: string): Promise<task_info>;
  list(): Promise<task_info[]>;
  on_output(handler: (event: task_output_event) => void): Promise<disposable>;
  on_status(handler: (event: task_status_event) => void): Promise<disposable>;
};
