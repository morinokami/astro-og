# Astro OG

<p align="center">
  <img src="./.github/assets/screenshot.png" alt="Screenshot" width="657" />
</p>

[Astro dev toolbar app](https://docs.astro.build/en/reference/dev-toolbar-app-reference/) that shows a preview of how the page will look like when shared on various social media platforms and helps you inspect [open graph](https://ogp.me/#metadata) properties. It's heavily inspired by [Vercel Toolbar](https://docs.astro.build/en/reference/dev-toolbar-app-reference/).

> [!NOTE]
> Currently, it only supports X (Twitter). Support for other platforms will be added in the future.

## Installation

```sh
npx astro add astro-og
```

### Manual Installation

First, install the `astro-og` package:

```sh
npm install -D astro-og
```

Then, add the `astro-og` integration to your Astro config:

```ts
import { defineConfig } from "astro/config";

import og from "astro-og";

export default defineConfig({
  integrations: [og()],
});
```

