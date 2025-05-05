import type { ComponentChildren } from "preact";

export type Platform = "X" | "Bluesky" | "Discord";

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
				<svg
					height="16"
					stroke-linejoin="round"
					viewBox="0 0 24 24"
					width="16"
					style="width: 16px; height: 16px; color: currentcolor;"
				>
					<title>X</title>
					<path
						d="M 18.242188 2.25 L 21.554688 2.25 L 14.324219 10.507812 L 22.828125 21.75 L 16.171875 21.75 L 10.953125 14.933594 L 4.992188 21.75 L 1.679688 21.75 L 9.40625 12.914062 L 1.257812 2.25 L 8.082031 2.25 L 12.792969 8.480469 Z M 17.082031 19.773438 L 18.914062 19.773438 L 7.082031 4.125 L 5.113281 4.125 Z M 17.082031 19.773438 "
						fill="currentColor"
					/>
				</svg>
			</TabItem>
			<TabItem
				platform="Bluesky"
				selected={selectedPlatform === "Bluesky"}
				onSelect={onSelect}
			>
				<svg
					height="16"
					stroke-linejoin="round"
					viewBox="0 0 24 24"
					width="16"
					style="width: 16px; height: 16px; color: currentcolor;"
				>
					<title>Bluesky</title>
					<path
						d="M12 10.8c-1-2.1-4-6-6.8-8C2.6 1 1.6 1.3.9 1.6.1 1.9 0 3 0 3.8c0 .7.4 5.6.6 6.4C1.4 13 4.3 14 7 13.6h.4H7c-4 .6-7.4 2-2.8 7 5 5.3 6.8-1 7.8-4.2 1 3.2 2 9.3 7.7 4.3 4.3-4.3 1.2-6.5-2.7-7a9 9 0 0 1-.4-.1h.4c2.7.3 5.6-.6 6.4-3.4.2-.8.6-5.7.6-6.4 0-.7-.1-1.9-.9-2.2-.7-.3-1.7-.7-4.3 1.2-2.8 2-5.7 5.9-6.8 8"
						fill="currentColor"
					/>
				</svg>
			</TabItem>
			<TabItem
				platform="Discord"
				selected={selectedPlatform === "Discord"}
				onSelect={onSelect}
			>
				<svg
					height="16"
					stroke-linejoin="round"
					viewBox="0 0 24 24"
					width="16"
					style="width: 16px; height: 16px; color: currentcolor;"
				>
					<title>Discord</title>
					<path
						d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28h-.05A19.74 19.74 0 0 0 3.64 4.4 20.26 20.26 0 0 0 .11 18.09l.02.02a19.9 19.9 0 0 0 6.04 3.03l.04-.02a14.24 14.24 0 0 0 1.23-2.03.08.08 0 0 0-.05-.07 13.1 13.1 0 0 1-1.9-.92.08.08 0 0 1 .02-.1 10.2 10.2 0 0 0 .41-.31h.04a14.2 14.2 0 0 0 12.1 0l.04.01a9.63 9.63 0 0 0 .4.32.08.08 0 0 1-.03.1 12.29 12.29 0 0 1-1.9.91.08.08 0 0 0-.02.1 15.97 15.97 0 0 0 1.27 2.01h.04a19.84 19.84 0 0 0 6.03-3.05v-.03a20.12 20.12 0 0 0-3.57-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.22 0 2.18 1.1 2.16 2.42 0 1.34-.94 2.42-2.16 2.42Z"
						fill="currentColor"
					/>
				</svg>
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
