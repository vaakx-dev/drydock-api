export type external_open_api = {
  open_external_url(url: string): Promise<void>;
  open_file_path(path: string): Promise<void>;
  open_file_location(path: string): Promise<void>;
};
