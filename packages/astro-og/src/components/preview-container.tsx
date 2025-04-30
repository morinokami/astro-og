import type React from "react";

interface PreviewContainerProps {
	children: React.ReactNode;
}

export function PreviewContainer({ children }: PreviewContainerProps) {
	return (
		<div style={{ width: "100%" }}>
			<div style={{ padding: "24px" }}>{children}</div>
		</div>
	);
}
