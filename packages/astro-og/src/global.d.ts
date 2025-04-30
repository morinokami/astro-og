import type React from "react";

declare module "react/jsx-runtime" {
	namespace JSX {
		interface IntrinsicElements {
			"astro-dev-toolbar-window": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"astro-dev-toolbar-icon": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & { icon?: string },
				HTMLElement
			>;
		}
	}
}
