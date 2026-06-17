export type json_value =
  | null
  | boolean
  | number
  | string
  | json_value[]
  | { [key: string]: json_value };

export type protocol_error = {
  code: string;
  message: string;
  details?: json_value;
  retryable: boolean;
};

export type disposable = {
  dispose(): void | Promise<void>;
};

export type dispose_function = () => void | Promise<void>;

export type JsonValue = json_value;
export type ProtocolError = protocol_error;
export type Disposable = disposable;
export type DisposeFunction = dispose_function;
