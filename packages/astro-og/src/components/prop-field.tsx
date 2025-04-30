interface PropFieldProps {
	prop: string;
	value?: string;
}

export function PropField({ prop, value }: PropFieldProps) {
	return (
		<section>
			<h2 style={{ display: "flex", alignItems: "center" }}>
				{value ? (
					prop
				) : (
					<>
						<astro-dev-toolbar-icon
							icon="warning"
							style={{
								color: "#ff9f1c",
								marginRight: "4px",
								width: "16px",
								height: "16px",
							}}
						/>
						{prop}
					</>
				)}
			</h2>
			<p style={{ fontSize: "14px" }}>
				{isValidUrl(value ?? "") &&
				(prop === "twitter:image" ||
					prop === "og:image" ||
					prop === "og:url") ? (
					<a href={value} target="_blank" rel="noreferrer">
						{value}
					</a>
				) : (
					(value ?? "Not provided")
				)}
			</p>
		</section>
	);
}

function isValidUrl(value: string) {
	try {
		new URL(value);
		return true;
	} catch (_error) {
		return false;
	}
}
