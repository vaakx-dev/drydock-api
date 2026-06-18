# drydock-api

Public TypeScript API contract for current Drydock extensions.

Use this package from GitHub:

```json
{
  "dependencies": {
    "@vaakx-dev/drydock-api": "github:vaakx-dev/drydock-api"
  }
}
```

Extension code should import types from the package:

```ts
import type { HostContext, UiContext, task_api, view_api } from "@vaakx-dev/drydock-api";
```

This package defines the extension contract. Drydock provides the runtime objects when it activates an extension.

The package exports only the active contract types for:

- `core` (`json_value`, `protocol_error`, `disposable`, `dispose_function`)
- `extensions` (`extension` manifest data, `load_extensions_response`, `UiContext`, `HostContext`, `UiHostClient`, `UiBridge`, command, service, import, and subscription types)
- `runtime` (`runtime_ui_api`, `host_task_api`, view, task, workspace state, and settings API types)
- `workspace` (`workspace_info`, `create_workspace_input`)
- `dialog` (`HostDialogApi`, dialog option types)
- `opener` (`HostOpenerApi`)
- `app` (`HostAppApi`)
- `native_helpers` (`window_state`, `window_api`)

Runtime UI APIs are available on `UiContext`:

- `views`: register, list, open, close, focus, and observe extension-provided views. Standard areas are `primary`, `sidebar`, `panel`, and `overlay`; extensions may use custom area strings for extension-owned layouts.
- `tasks`: start, update, write output for, finish, list, and observe runtime tasks.
- `workspace_state`: store extension-scoped JSON state for the active workspace.
- `settings`: store extension-scoped JSON settings across workspaces.

Host extensions can report work through `HostContext.tasks.start(...)`. The shell runtime owns display and observation of reported tasks.

Host extensions can contribute commands through `HostContext.commands`. Commands are a core Drydock capability, not an extension package dependency.

Extension services are declared in `drydock.services` and consumed through generated `HostContext<Imports>` types. Consumers should use manifest aliases on `context.imports` instead of importing provider packages.
