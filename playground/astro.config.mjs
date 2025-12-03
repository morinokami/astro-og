import { defineConfig } from "astro/config";
import showcase from "astro-dev-toolbar-showcase";
import mcp from "astro-mcp";
import og from "astro-og";

// https://astro.build/config
export default defineConfig({
	integrations: [mcp(), showcase(), og()],
});
