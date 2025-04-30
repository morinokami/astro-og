import { PreviewContainer } from "./preview-container";

interface PreviewSummaryProps {
	image?: string;
	title?: string;
	description?: string;
}

export function PreviewSummary({
	image,
	title,
	description,
}: PreviewSummaryProps) {
	return (
		<PreviewContainer>
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
					<img
						src={image ?? ""} // TODO: Show fallback image if image not loaded
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
					/>
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
						{document.location.host}
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
		</PreviewContainer>
	);
}
