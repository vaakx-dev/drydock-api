# drydock-api

Public TypeScript API contract for Drydock extensions.

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
