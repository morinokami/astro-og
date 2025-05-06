import { useState } from "preact/hooks";
import { PreviewSummary } from "./preview-summary";

interface PreviewSummaryLargeImageProps {
	image: string;
	title?: string;
	hostname: string;
}

export function PreviewSummaryLargeImage({
	image,
	title,
	hostname,
}: PreviewSummaryLargeImageProps) {
	const [imgError, setImgError] = useState(false);

	return !imgError ? (
		<>
			<div
				style={{
					background: "#13151a",
					border: "1px solid #2f3336",
					borderRadius: "16px",
					overflow: "hidden",
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<img
						src={image}
						alt=""
						style={{
							aspectRatio: "1.91",
							height: "auto",
							maxHeight: "310px",
							objectFit: "cover",
						}}
						onError={() => setImgError(true)}
					/>
					<div
						style={{
							border: "0",
							position: "absolute",
							bottom: "12px",
							left: "12px",
							right: "12px",
							fontFamily:
								"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
						}}
					>
						<span
							style={{
								backgroundColor: "rgba(0,0,0,.77)",
								borderRadius: "4px",
								color: "#fff",
								fontSize: "13px",
								fontWeight: "500",
								height: "20px",
								lineHeight: "16px",
								maxWidth: "100%",
								overflow: "hidden",
								padding: "2px 4px",
								textOverflow: "ellipsis",
								userSelect: "none",
								whiteSpace: "nowrap",
								width: "fit-content",
							}}
						>
							{title ?? "Title not provided"}
						</span>
					</div>
				</div>
			</div>
			<span
				style={{
					display: "block",
					color: "#71767b",
					fontSize: "13px",
					fontWeight: "500",
					lineHeight: "16px",
					marginTop: "6px",
				}}
			>
				From: {hostname}
			</span>
		</>
	) : (
		<PreviewSummary
			image={image}
			title={title}
			hostname={hostname}
			isFallback={true}
		/>
	);
}
