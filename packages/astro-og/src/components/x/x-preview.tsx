import { NoPreview } from "./no-preview";
import { PreviewSummary } from "./preview-summary";
import { PreviewSummaryLargeImage } from "./preview-summary-large-image";

export function XPreview({
	props,
}: {
	props: Record<string, string | undefined>;
}) {
	const cardType = props["twitter:card"];
	const image = props["twitter:image"] ?? props["og:image"];
	const title = props["twitter:title"] ?? props["og:title"] ?? props.title;
	const description =
		props["twitter:description"] ??
		props["og:description"] ??
		props.description;

	return cardType === undefined ? (
		<NoPreview />
	) : cardType === "summary" || image === undefined ? (
		<PreviewSummary image={image} title={title} description={description} />
	) : (
		<PreviewSummaryLargeImage image={image} title={title} />
	);
}
