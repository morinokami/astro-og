import type { DevToolbarApp } from "astro";
import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";

import { App } from "./app";
import { parse } from "./meta";
import { closeOnOutsideClick } from "./utils";

export default defineToolbarApp({
	init(canvas, eventTarget) {
		createWindow();

		document.addEventListener("astro:after-swap", createWindow);

		function createWindow() {
			const meta = parse(document.head.innerHTML);
			const props = {
				"twitter:image": meta.twitter?.image,
				"twitter:card": meta.twitter?.card,
				"twitter:title": meta.twitter?.title,
				"twitter:description": meta.twitter?.description,
				title: meta.title,
				description: meta.description,
				"og:image": meta.openGraph?.image,
				"og:site_name": meta.openGraph?.siteName,
				"og:title": meta.openGraph?.title,
				"og:description": meta.openGraph?.description,
				"og:url": meta.openGraph?.url,
			};

			render(<App props={props} />, canvas);

			closeOnOutsideClick(eventTarget);
		}
	},
}) satisfies DevToolbarApp;
