export type dialog_filter = {
  name: string;
  extensions: string[];
};

export type dialog_options = {
  title?: string;
  default_path?: string;
};

export type open_file_options = dialog_options & {
  filters?: dialog_filter[];
};

export type save_file_options = dialog_options & {
  filters?: dialog_filter[];
};

export type HostDialogApi = {
  open_file(options?: open_file_options): Promise<string | null>;
  open_files(options?: open_file_options): Promise<string[]>;
  save_file(options?: save_file_options): Promise<string | null>;
  select_folder(options?: dialog_options): Promise<string | null>;
};

export type DialogFilter = dialog_filter;
export type DialogOptions = dialog_options;
export type OpenFileOptions = open_file_options;
export type SaveFileOptions = save_file_options;
