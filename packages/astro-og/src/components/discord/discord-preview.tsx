import { PreviewContainer } from "../preview-container";

interface DiscordPreviewProps {
	props: Record<string, string | undefined>;
}

export function DiscordPreview({ props }: DiscordPreviewProps) {
	const image = props["og:image"];
	const title = props["og:title"] ?? props.title;
	const description = props["og:description"] ?? props.description;
	const siteName = props["og:site_name"];
	const url = props["og:url"];

	return (
		<PreviewContainer>
			<div
				id="panel-Discord"
				role="tabpanel"
				aria-labelledby="tab-Discord"
				style={{ display: "flex" }}
			>
				<div
					style={{
						background: "oklab(0.35016 0.00197881 -0.0119994)",
						color: "oklab(0.906424 -0.000235766 -0.0028885)",
						border: "1px solid oklab(0.678888 0.00325716 -0.011175 / 0.121569)",
						borderLeft: "4px solid oklab(0.678888 0.00325716 -0.011175 / 0.2)",
						borderRadius: "4px",
						display: "inline-block",
						fontSize: "16px",
						margin: "0 auto",
						maxWidth: "400px",
						padding: "2px 16px 16px 12px",
					}}
				>
					<div
						style={{
							fontSize: "12px",
							marginTop: "8px",
						}}
					>
						{siteName}
					</div>
					<a
						href={url}
						style={{
							color: "oklab(0.74783 -0.0289609 -0.111271)",
							display: "block",
							fontWeight: "600",
							marginTop: "8px",
							cursor: "pointer",
							outline: "none",
							textDecoration: "none",
						}}
					>
						<span style={{ display: "block" }}>
							{title ?? "Title not provided"}
						</span>
					</a>
					<div
						style={{
							fontSize: "14px",
							marginTop: "8px",
							color: "oklab(0.906424 -0.000235766 -0.0028885)",
						}}
					>
						{description}
					</div>
					{image && (
						<div style={{ marginTop: "16px" }}>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<img
									src={image}
									alt=""
									height={300}
									style={{
										borderRadius: "4px",
										background: "#000",
										aspectRatio: "400 / 210",
										height: "auto",
										maxHeight: "310px",
										objectFit: "cover",
										display: "block",
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</PreviewContainer>
	);
}
