import { useState } from "preact/hooks";

interface PreviewSummaryProps {
	image?: string;
	title?: string;
	description?: string;
	hostname: string;
	isFallback?: boolean;
}

export function PreviewSummary({
	image,
	title,
	description,
	hostname,
	isFallback = false,
}: PreviewSummaryProps) {
	const [imgError, setImgError] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				border: "1px solid #2f3336",
				borderRadius: "16px",
				fontFamily:
					"TwitterChirp,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
				fontSize: "15px",
				fontWeight: "400",
				height: "130px",
				lineHeight: "20px",
				overflow: "hidden",
				position: "relative",
				userSelect: "none",
				width: "100%",
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					background: "#16181c",
					borderRight: "1px solid #2f3336",
					flexShrink: "0",
					justifyContent: "center",
					position: "relative",
					userSelect: "none",
					width: "130px",
					flexDirection: "column",
				}}
			>
				{isFallback || !image || imgError ? (
					<svg
						viewBox="0 0 24 24"
						style={{
							color: "#71767b",
							height: "2em",
							fill: "currentColor",
						}}
					>
						<title>Image not available</title>
						<g>
							<path d="M1.998 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.12 2.5 2.5v13c0 1.38-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.276 0-.5.22-.5.5v13c0 .28.224.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zM6 7h6v6H6V7zm2 2v2h2V9H8zm10 0h-4V7h4v2zm0 4h-4v-2h4v2zm-.002 4h-12v-2h12v2z" />
						</g>
					</svg>
				) : (
					<img
						src={image ?? ""}
						alt=""
						style={{
							height: "100%",
							left: "0",
							objectFit: "cover",
							position: "absolute",
							top: "0",
							width: "100%",
							aspectRatio: "16 / 9",
							maxHeight: "310px",
						}}
						onError={() => setImgError(true)}
					/>
				)}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: "1 1",
					justifyContent: "center",
					gap: "2px",
					padding: "12px",
					minWidth: "0",
				}}
			>
				<span
					style={{
						overflow: "hidden",
						textWrap: "nowrap",
						whiteSpace: "nowrap",
						color: "#71767b",
					}}
				>
					{hostname}
				</span>
				<div style={{ flexShrink: "0" }}>
					<span
						style={{
							color: "#e7e9ea",
							overflow: "hidden",
							textWrap: "nowrap",
							whiteSpace: "nowrap",
							display: "block",
						}}
					>
						{title ?? "Title not provided"}
					</span>
					<span
						style={{
							WebkitLineClamp: "2",
							color: "#71767b",
							wordWrap: "break-word",
							display: "-webkit-box",
							maxWidth: "100%",
							minWidth: "0",
							overflow: "hidden",
							WebkitBoxOrient: "vertical",
						}}
					>
						{description ?? "Description not provided"}
					</span>
				</div>
			</div>
		</div>
	);
}
