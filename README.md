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
import type { HostContext, UiContext } from "@vaakx-dev/drydock-api";
```

This package defines the extension contract. Drydock provides the runtime objects when it activates an extension.

The package exports only the active contract types for:

- `core` (`json_value`, `protocol_error`, `disposable`, `dispose_function`)
- `extensions` (`extension` manifest data, `load_extensions_response`, `UiContext`, `HostContext`, `UiHostClient`, `UiBridge`, `ExportRegistry`, `ExtensionServiceClient`, `DisposableScope`)
- `workspace` (`workspace_info`, `create_workspace_input`)
- `dialog` (`HostDialogApi`, dialog option types)
- `opener` (`HostOpenerApi`)
- `app` (`HostAppApi`)
- `native_helpers` (`window_state`, `window_api`)
