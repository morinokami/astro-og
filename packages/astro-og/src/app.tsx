import { useState } from "preact/hooks";

import { Fragment } from "preact/jsx-runtime";
import { DiscordPreview } from "./components/discord/discord-preview";
import { PropField } from "./components/prop-field";
import { type Platform, Tabs } from "./components/tabs";
import { XPreview } from "./components/x/x-preview";

interface AppProps {
	cardType?: "summary" | "summary_large_image";
	image?: string;
	title?: string;
	description?: string;
	siteName?: string;
	url?: string;
	props: Record<string, string | undefined>;
}

export function App({ props }: AppProps) {
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>("X");

	return (
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

							.tab-item {
								background: rgb(19, 21, 26);
								color: rgb(161, 161, 161);
								padding: 8px 12px;
								display: flex;
								align-items: center;
								justify-content: center;
								cursor: pointer;
								border: none;
							}
							.tab-item.selected {
								background: rgba(71, 78, 94, 1);
								border-radius: 2px;
								color: rgb(237, 237, 237);
							}
							.tab-item:hover {
								color: rgb(237, 237, 237);
							}
						`}
			</style>
			<header>
				<h1>Astro Open Graph</h1>
			</header>
			<hr />

			<Tabs
				selectedPlatform={selectedPlatform}
				onSelect={setSelectedPlatform}
			/>

			{selectedPlatform === "X" ? (
				<XPreview props={props} />
			) : (
				<DiscordPreview props={props} />
			)}

			{Object.entries(props).map(([key, value]) => {
				if (selectedPlatform !== "X" && key.startsWith("twitter:")) {
					return null;
				}

				return (
					<Fragment key={key}>
						<hr />
						<PropField prop={key} value={value} />
					</Fragment>
				);
			})}
		</astro-dev-toolbar-window>
	);
}
