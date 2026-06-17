import type { disposable } from "./core.js";

export type window_state = {
  is_maximized: boolean;
};

export type window_api = {
  get_state(): Promise<window_state>;
  on_state_changed(handler: (state: window_state) => void): Promise<disposable>;
  set_title(title: string): Promise<void>;
  minimize(): Promise<void>;
  start_dragging(): Promise<void>;
  is_maximized(): Promise<boolean>;
  maximize(): Promise<void>;
  unmaximize(): Promise<void>;
  toggle_maximize(): Promise<void>;
  close(): Promise<void>;
};
