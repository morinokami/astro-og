import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts", "src/astro-og.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	minify: true,
});
