import type { AstroIntegration } from "astro";

export default function createAstroOg(): AstroIntegration {
	return {
		name: "astro-og",
		hooks: {
			"astro:config:setup": ({ addDevToolbarApp }) => {
				addDevToolbarApp({
					id: "astro-og",
					name: "Open Graph",
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
					entrypoint: new URL("./astro-og.js", import.meta.url),
				});
			},
		},
	};
}
