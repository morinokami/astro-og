import showcase from "astro-dev-toolbar-showcase";
import mcp from "astro-mcp";
import og from "astro-og";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [mcp(), showcase(), og()],
});
