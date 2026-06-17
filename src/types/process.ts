import type { disposable } from "./core.js";

export type process_status = "running" | "exited" | "stopped" | "failed";

export type spawn_process_request = {
  command: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
};

export type process_info = {
  process_id: string;
  command: string;
  args: string[];
  cwd?: string;
  status: process_status;
  exit_code?: number;
  error?: string;
};

export type process_output_event = {
  process_id: string;
  stream: "stdout" | "stderr";
  line: string;
};

export type process_status_event = {
  process_id: string;
  status: process_status;
  exit_code?: number;
  error?: string;
};

export type process_api = {
  spawn(request: spawn_process_request): Promise<process_info>;
  stop(process_id: string): Promise<process_info>;
  list(): Promise<process_info[]>;
  on_output(handler: (event: process_output_event) => void): Promise<disposable>;
  on_status(handler: (event: process_status_event) => void): Promise<disposable>;
};
