import type { DevToolbarApp } from "astro";
import { defineToolbarApp } from "astro/toolbar";

export default defineToolbarApp({
	init(canvas) {
		const text = document.createTextNode("Hello World!");
		canvas.appendChild(text);
	},
	beforeTogglingOff() {
		const confirmation = window.confirm("Really exit?");
		return confirmation;
	},
}) satisfies DevToolbarApp;
