import type { disposable } from "./core.js";

export type terminal_status = "running" | "exited" | "closed" | "failed";

export type open_terminal_request = {
  title?: string;
  shell?: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
  rows?: number;
  cols?: number;
};

export type terminal_info = {
  terminal_id: string;
  title?: string;
  shell: string;
  args: string[];
  cwd?: string;
  rows: number;
  cols: number;
  status: terminal_status;
  exit_code?: number;
  error?: string;
};

export type terminal_output_event = {
  terminal_id: string;
  chunk: string;
};

export type terminal_status_event = {
  terminal_id: string;
  status: terminal_status;
  exit_code?: number;
  error?: string;
  rows: number;
  cols: number;
};

export type terminal_api = {
  open_terminal(request: open_terminal_request): Promise<terminal_info>;
  write_terminal(terminal_id: string, data: string): Promise<void>;
  resize_terminal(terminal_id: string, rows: number, cols: number): Promise<terminal_info>;
  close_terminal(terminal_id: string): Promise<terminal_info>;
  list_terminals(): Promise<terminal_info[]>;
  on_output(handler: (event: terminal_output_event) => void): Promise<disposable>;
  on_status(handler: (event: terminal_status_event) => void): Promise<disposable>;
};
