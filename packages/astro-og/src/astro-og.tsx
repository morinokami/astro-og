import type { DevToolbarApp } from "astro";
import { defineToolbarApp } from "astro/toolbar";
import { Fragment, render } from "preact";

import { NoPreview } from "./components/no-preview";
import { PreviewSummary } from "./components/preview-summary";
import { PreviewSummaryLargeImage } from "./components/preview-summary-large-image";
import { PropField } from "./components/prop-field";
import { parse } from "./meta";
import { closeOnOutsideClick } from "./utils";

export default defineToolbarApp({
	init(canvas, eventTarget) {
		createWindow();

		document.addEventListener("astro:after-swap", createWindow);

		function createWindow() {
			const meta = parse(document.head.innerHTML);
			const cardType = meta.twitter?.card;
			const image = meta.twitter?.image ?? meta.openGraph?.image;
			const title = meta.twitter?.title ?? meta.openGraph?.title ?? meta.title;
			const description =
				meta.twitter?.description ??
				meta.openGraph?.description ??
				meta.description;
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

			render(
				<astro-dev-toolbar-window style={{ overflow: "auto" }}>
					<style>
						{`
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
						`}
					</style>
					<header>
						<h1>Astro Open Graph</h1>
					</header>
					<hr />

					{/* TODO: render tabs for selecting a service */}

					{cardType === undefined ? (
						<NoPreview />
					) : cardType === "summary" || image === undefined ? (
						<PreviewSummary
							image={image}
							title={title}
							description={description}
						/>
					) : (
						<PreviewSummaryLargeImage image={image} title={title} />
					)}

					{Object.entries(props).map(([key, value]) => (
						<Fragment key={key}>
							<hr />
							<PropField prop={key} value={value} />
						</Fragment>
					))}
				</astro-dev-toolbar-window>,
				canvas,
			);

			closeOnOutsideClick(eventTarget);
		}
	},
}) satisfies DevToolbarApp;
