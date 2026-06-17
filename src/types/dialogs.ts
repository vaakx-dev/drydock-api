export type dialog_kind = "info" | "warning" | "error";

export type message_dialog_request = {
  message: string;
  title?: string;
  kind?: dialog_kind;
};

export type dialog_api = {
  open_file_dialog(): Promise<string | null>;
  save_file_dialog(): Promise<string | null>;
  select_folder_dialog(): Promise<string | null>;
  show_message_dialog(request: message_dialog_request): Promise<void>;
  show_confirm_dialog(request: message_dialog_request): Promise<boolean>;
};
