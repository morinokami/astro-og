import type { DevToolbarApp } from "astro";
import type { DevToolbarWindow } from "astro/runtime/client/dev-toolbar/ui-library/window.js";
import { defineToolbarApp } from "astro/toolbar";

export default defineToolbarApp({
	init(canvas) {
		const windowElement = document.createElement("astro-dev-toolbar-window");
		windowElement.style.overflow = "auto";

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
        margin: 0px 0px 4px;
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

		const header = document.createElement("header");
		const title = document.createElement("h1");
		title.textContent = "Astro Open Graph";
		header.appendChild(title);
		windowElement.appendChild(header);

		appendHr(windowElement);

		canvas.appendChild(windowElement);
	},
}) satisfies DevToolbarApp;

function appendHr(windowElement: DevToolbarWindow) {
	const hr = document.createElement("hr");
	windowElement.appendChild(hr);
}
