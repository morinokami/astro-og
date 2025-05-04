export function NoPreview() {
	return (
		<div
			id="panel-X"
			role="tabpanel"
			aria-labelledby="tab-X"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				width: "100%",
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<astro-dev-toolbar-icon
					icon="warning"
					style={{
						color: "#ff9f1c",
						marginRight: "4px",
						width: "16px",
						height: "16px",
					}}
				/>
				<p style={{ color: "#71767b", textAlign: "center" }}>
					No preview available
				</p>
			</div>
			<p
				style={{
					textAlign: "center",
					marginTop: "16px",
					lineHeight: "2.2",
					maxWidth: "380px",
					fontSize: "14px",
				}}
			>
				Property <code>twitter:card</code> is required. Must be one of{" "}
				<code>summary</code>, <code>summary_large_image</code>, <code>app</code>{" "}
				or <code>player</code>.
			</p>
		</div>
	);
}
