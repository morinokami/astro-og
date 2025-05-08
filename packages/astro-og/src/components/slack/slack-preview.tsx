import { useState } from "preact/hooks";
import { getHostname } from "../../utils";

interface SlackPreviewProps {
	props: Record<string, string | undefined>;
}

export function SlackPreview({ props }: SlackPreviewProps) {
	const image = props["og:image"];
	const title = props["og:title"] ?? props.title;
	const description = props["og:description"] ?? props.description;
	const url = props["og:url"];

	const hostname = getHostname(url ?? "");

	const [imgError, setImgError] = useState(false);

	return (
		<div
			style={{
				background: "#1a1d21",
				boxShadow: "none",
				display: "flex",
				padding: "8px",
				borderRadius: "8px",
				gap: "12px",
				overflow: "hidden",
				userSelect: "none",
				width: "100%",
			}}
		>
			<div
				style={{
					background: "#35373b",
					borderRadius: "2px",
					flexShrink: 0,
					minHeight: "100%",
					width: "4px",
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexShrink: 0,
						fontSize: "14px",
						marginBottom: "5px",
						lineHeight: "1.46668",
					}}
				>
					<span
						style={{ color: "#d1d2d3", fontWeight: "700", display: "block" }}
					>
						{hostname}
					</span>
					<span
						style={{ color: "#1d9bd1", fontWeight: "700", display: "block" }}
					>
						<a
							href={url}
							style={{
								color: "inherit",
								textDecoration: "underline",
							}}
						>
							{title}
						</a>
					</span>
					<span style={{ color: "#d1d2d3", display: "block" }}>
						{description}
					</span>
				</div>
				{image && !imgError && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "360px",
						}}
					>
						<img
							src={image}
							alt=""
							style={{
								border: "1px solid #222",
								borderRadius: "8px",
								width: "100%",
								aspectRatio: "40 / 21",
								height: "auto",
								maxHeight: "310px",
								objectFit: "cover",
								display: "block",
							}}
							onError={() => setImgError(true)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
