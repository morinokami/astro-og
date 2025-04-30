import type preact from "preact";

declare module "preact" {
	namespace JSX {
		interface IntrinsicElements {
			"astro-dev-toolbar-window": preact.JSX.HTMLAttributes<HTMLElement>;
			"astro-dev-toolbar-icon": preact.JSX.HTMLAttributes<HTMLElement> & {
				icon?: string;
			};
		}
	}
}
