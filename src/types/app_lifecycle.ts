export type app_lifecycle_api = {
  reload_current_window(): Promise<void>;
  restart_app(): Promise<void>;
  quit_app(): Promise<void>;
};
