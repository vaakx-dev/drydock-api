import type {
  HostContext,
  UiContext,
  disposable,
  json_value,
  registered_task,
  registered_view,
  settings_api,
  host_task_api,
  task_api,
  view_api,
  workspace_state_api,
} from "@vaakx-dev/drydock-api";

declare const context: UiContext;
declare const host_context: HostContext;

const views: view_api = context.views;
const tasks: task_api = context.tasks;
const workspace_state: workspace_state_api = context.workspace_state;
const settings: settings_api = context.settings;

const view = views.register({
  id: "main",
  title: "Main",
  area: "timeline",
  open: () => {},
  close: async () => {},
});

const listed_views: registered_view[] = views.list();
const open_result: Promise<void> = views.open("main");
const close_result: Promise<void> = views.close("main");
const focus_result: void = views.focus("main");
const view_subscription: disposable = views.on_changed((items: registered_view[]) => {
  for (const item of items) {
    const focused: boolean = item.focused;
    const state: "closed" | "open" = item.state;
    void focused;
    void state;
  }
});

const task = tasks.start({ id: "build", title: "Build", cancellable: true });
const task_id: string = task.id;
const task_global_id: string = task.global_id;
task.update({ state: "running", progress: 0.5 });
task.write({ stream: "stdout", text: "ok\n" });
task.finish({ state: "done" });
const task_dispose_result: void | Promise<void> = task.dispose();

const listed_tasks: registered_task[] = tasks.list();
const task_subscription: disposable = tasks.on_changed((items: registered_task[]) => {
  for (const item of items) {
    const output: string = item.output.map((line) => line.text).join("");
    void output;
  }
});

workspace_state.set("mode", "inspect");
workspace_state.set("layout", { open: true, areas: ["primary", "panel"] });
settings.set("theme", "dark");
settings.set("limits", { max_tasks: 4 });
const workspace_delete_result: void = workspace_state.delete("mode");
const settings_delete_result: void = settings.delete("theme");

const value: json_value | undefined = workspace_state.get("mode");
const theme: string | undefined = settings.get<string>("theme");

void listed_views;
void open_result;
void close_result;
void focus_result;
void view_subscription;
void task_id;
void task_global_id;
void task_dispose_result;
void listed_tasks;
void task_subscription;
void workspace_delete_result;
void settings_delete_result;
void value;
void theme;
void view;
void task;

const host_tasks: host_task_api = host_context.tasks;
const host_task = host_context.tasks.start({ id: "index", title: "Index workspace" });
const host_task_id: string = host_task.id;
const host_task_global_id: string = host_task.global_id;
host_task.update({ state: "running" });
host_task.write({ stream: "log", text: "started\n" });
host_task.finish({ state: "done" });
const host_task_dispose_result: void | Promise<void> = host_task.dispose();
void host_task_id;
void host_task_global_id;
void host_task_dispose_result;
void host_task;

// @ts-expect-error commands are extension-owned services, not a host context API.
host_context.commands;

type ImportedServices = {
  notes: {
    list(): Promise<{ id: string; title: string }[]>;
  };
};

declare const imported_host_context: HostContext<ImportedServices>;
const notes = imported_host_context.imports.notes;
const listed_notes = notes.list();
void listed_notes;
