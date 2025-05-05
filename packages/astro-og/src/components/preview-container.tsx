import type preact from "preact";

interface PreviewContainerProps {
	children: preact.JSX.Element;
}

export function PreviewContainer({ children }: PreviewContainerProps) {
	return (
		<div style={{ width: "100%" }}>
			<div style={{ padding: "16px 24px 0px" }}>{children}</div>
		</div>
	);
}
