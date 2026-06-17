import type { disposable, json_value } from "./core.js";

export type event_handler<T = json_value> = (payload: T) => void;

export type event_bus = {
  emit<T = json_value>(name: string, payload: T): void;
  on<T = json_value>(name: string, handler: event_handler<T>): disposable;
};
