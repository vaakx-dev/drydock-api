export type HostOpenerApi = {
  open_url(url: string): Promise<void>;
  open_path(path: string): Promise<void>;
  reveal_path(path: string): Promise<void>;
};
