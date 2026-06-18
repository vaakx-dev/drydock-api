export type HostAppApi = {
  quit(): Promise<void>;
  restart(): Promise<void>;
  version(): Promise<string>;
};
