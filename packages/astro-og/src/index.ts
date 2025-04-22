import type { AstroIntegration } from "astro";

export default function createAstroOg(): AstroIntegration {
	return {
		name: "astro-og",
		hooks: {
			"astro:config:setup": ({ addDevToolbarApp }) => {
				addDevToolbarApp({
					id: "astro-og",
					name: "Astro OG",
					icon: "star",
					entrypoint: new URL("./astro-og.mjs", import.meta.url),
				});
			},
		},
	};
}
