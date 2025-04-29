import type { DevToolbarApp } from "astro";
import type { DevToolbarWindow } from "astro/runtime/client/dev-toolbar/ui-library/window.js";
import { defineToolbarApp } from "astro/toolbar";

import { parse, renderTwitterPreview } from "./utils";

export default defineToolbarApp({
	init(canvas) {
		createWindow();

		document.addEventListener("astro:after-swap", createWindow);

		function createWindow() {
			const meta = parse(document.head.innerHTML);

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

      p {
        margin: 0px;
      }

      code {
        color: rgba(224, 204, 250, 1);
        border-color: #343841;
        border-style: solid;
        border-width: 1px;
        border-radius: .4em;
        background-color: #24262D;
        padding: .3em;
      }

      a, a:visited {
        color: rgba(224, 204, 250, 1);
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
			const previewElement = renderTwitterPreview(
				meta.twitter?.card,
				meta.twitter?.image ?? meta.openGraph?.image,
				meta.twitter?.title ?? meta.openGraph?.title ?? meta.title,
			);
			windowElement.appendChild(previewElement);
			appendHr(windowElement);

			// render props
			appendPropField(windowElement, "twitter:image", meta.twitter?.image);
			appendHr(windowElement);
			appendPropField(windowElement, "twitter:card", meta.twitter?.card);
			appendHr(windowElement);
			appendPropField(windowElement, "twitter:title", meta.twitter?.title);
			appendHr(windowElement);
			appendPropField(
				windowElement,
				"twitter:description",
				meta.twitter?.description,
			);
			appendHr(windowElement);
			appendPropField(windowElement, "title", meta.title);
			appendHr(windowElement);
			appendPropField(windowElement, "description", meta.description);
			appendHr(windowElement);
			appendPropField(windowElement, "og:image", meta.openGraph?.image);
			appendHr(windowElement);
			appendPropField(windowElement, "og:site_name", meta.openGraph?.siteName);
			appendHr(windowElement);
			appendPropField(windowElement, "og:title", meta.openGraph?.title);
			appendHr(windowElement);
			appendPropField(
				windowElement,
				"og:description",
				meta.openGraph?.description,
			);
			appendHr(windowElement);
			appendPropField(windowElement, "og:url", meta.openGraph?.url);

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
	fieldTitle.style.display = "flex";
	fieldTitle.style.alignItems = "center";
	if (value) {
		fieldTitle.textContent = prop;
	} else {
		const warningIcon = document.createElement("astro-dev-toolbar-icon");
		warningIcon.icon = "warning";
		warningIcon.style.color = "#ff9f1c";
		warningIcon.style.marginRight = "4px";
		warningIcon.style.width = "16px";
		warningIcon.style.height = "16px";
		fieldTitle.appendChild(warningIcon);
		fieldTitle.appendChild(document.createTextNode(prop));
	}
	const fieldDescription = document.createElement("p");
	if (
		isValidUrl(value ?? "") &&
		(prop === "twitter:image" || prop === "og:image" || prop === "og:url")
	) {
		fieldDescription.innerHTML = `<a href="${value}" target="_blank">${value}</a>`;
	} else {
		fieldDescription.textContent = value ?? "Not provided";
	}
	fieldDescription.style.fontSize = "14px";
	section.appendChild(fieldTitle);
	section.appendChild(fieldDescription);
	windowElement.appendChild(section);
}

function isValidUrl(value: string) {
	try {
		new URL(value);
		return true;
	} catch (_error) {
		return false;
	}
}
