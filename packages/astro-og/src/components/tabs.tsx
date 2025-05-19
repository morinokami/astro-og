import type { ComponentChildren } from "preact";

import { SvgBluesky, SvgDiscord, SvgSlack, SvgX } from "./icons";

export type Platform = "X" | "Bluesky" | "Discord" | "Slack";

interface TabsProps {
	selectedPlatform: Platform;
	onSelect: (platform: Platform) => void;
}

export function Tabs({ selectedPlatform, onSelect }: TabsProps) {
	return (
		<div
			role="tablist"
			aria-label="Platforms"
			aria-orientation="horizontal"
			style={{
				marginTop: "8px",
				display: "flex",
				gap: "2px",
				border: "1px solid rgba(35, 38, 45, 1)",
				borderRadius: "6px",
				padding: "4px",
				margin: "0 auto",
			}}
		>
			<TabItem
				platform="X"
				selected={selectedPlatform === "X"}
				onSelect={onSelect}
			>
				<SvgX />
			</TabItem>
			<TabItem
				platform="Bluesky"
				selected={selectedPlatform === "Bluesky"}
				onSelect={onSelect}
			>
				<SvgBluesky />
			</TabItem>
			<TabItem
				platform="Discord"
				selected={selectedPlatform === "Discord"}
				onSelect={onSelect}
			>
				<SvgDiscord />
			</TabItem>
			<TabItem
				platform="Slack"
				selected={selectedPlatform === "Slack"}
				onSelect={onSelect}
			>
				<SvgSlack />
			</TabItem>
		</div>
	);
}

function TabItem({
	platform,
	selected,
	onSelect,
	children,
}: {
	platform: Platform;
	selected: boolean;
	onSelect: (platform: Platform) => void;
	children: ComponentChildren;
}) {
	return (
		<button
			id={`tab-${platform}`}
			className={`tab-item ${selected ? "selected" : ""}`}
			type="button"
			role="tab"
			aria-selected={selected}
			aria-controls={`panel-${platform}`}
			tabIndex={selected ? 0 : -1}
			onClick={() => {
				onSelect(platform);
			}}
		>
			{children}
		</button>
	);
}
