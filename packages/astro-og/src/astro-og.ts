import type { DevToolbarApp } from "astro";
import type { DevToolbarWindow } from "astro/runtime/client/dev-toolbar/ui-library/window.js";
import { defineToolbarApp } from "astro/toolbar";

import { parse, renderTwitterPreview } from "./utils";

export default defineToolbarApp({
	init(canvas) {
		createWindow();

		document.addEventListener("astro:after-swap", createWindow);

		function createWindow() {
			const og = parse(document.head.innerHTML);

			const windowElement = document.createElement("astro-dev-toolbar-window");
			windowElement.style.overflow = "auto";

			// render styles
			const style = document.createElement("style");
			style.textContent = `
      h1 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: rgb(255, 255, 255);
        margin: 0px;
        font-size: 22px;
      }

      h2 {
        font-size: 16px;
        font-weight: 400;
        color: white;
        margin: 0px 0px 8px;
      }

      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        line-height: 1.5rem;
      }

      p {
        margin: 0px;
      }

      a, a:visited {
        color: rgb(9, 105, 218);
      }
    `;
			windowElement.appendChild(style);

			// render header
			const header = document.createElement("header");
			const title = document.createElement("h1");
			title.textContent = "Astro Open Graph";
			header.appendChild(title);
			windowElement.appendChild(header);
			appendHr(windowElement);

			// TODO: render tabs for selecting a service

			// render preview
			// TODO: fallback to open graph if twitter is not set
			if (og.twitter?.image && og.twitter?.title) {
				const previewElement = renderTwitterPreview(
					og.twitter?.card ?? "summary",
					og.twitter?.image,
					og.twitter?.title,
				);
				windowElement.appendChild(previewElement);
				appendHr(windowElement);
			}
			// TODO: render no preview component if props are not set

			// render props
			appendPropField(windowElement, "twitter:image", og.twitter?.image);
			appendHr(windowElement);
			appendPropField(windowElement, "twitter:card", og.twitter?.card);
			appendHr(windowElement);
			appendPropField(windowElement, "twitter:title", og.twitter?.title);
			appendHr(windowElement);
			appendPropField(
				windowElement,
				"twitter:description",
				og.twitter?.description,
			);
			appendHr(windowElement);
			appendPropField(windowElement, "title", og.title);
			appendHr(windowElement);
			appendPropField(windowElement, "description", og.description);
			appendHr(windowElement);
			appendPropField(windowElement, "og:image", og.openGraph?.image);
			appendHr(windowElement);
			appendPropField(windowElement, "og:site_name", og.openGraph?.siteName);
			appendHr(windowElement);
			appendPropField(windowElement, "og:title", og.openGraph?.title);
			appendHr(windowElement);
			appendPropField(
				windowElement,
				"og:description",
				og.openGraph?.description,
			);
			appendHr(windowElement);
			appendPropField(windowElement, "og:url", og.openGraph?.url);

			canvas.appendChild(windowElement);
		}
	},
}) satisfies DevToolbarApp;

function appendHr(windowElement: DevToolbarWindow) {
	const hr = document.createElement("hr");
	windowElement.appendChild(hr);
}

function appendPropField(
	windowElement: DevToolbarWindow,
	prop: string,
	value?: string,
) {
	const section = document.createElement("section");
	const fieldTitle = document.createElement("h2");
	fieldTitle.textContent = prop;
	const fieldDescription = document.createElement("p");
	fieldDescription.textContent = value ?? "No value found";
	section.appendChild(fieldTitle);
	section.appendChild(fieldDescription);
	windowElement.appendChild(section);
}
