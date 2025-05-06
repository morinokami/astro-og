import { getHostname } from "../../utils";
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
	const url = props["og:url"];

	// This is not how X does it, but it's the best we can do for now because
	// this app does not have access to the actual URL of the page.
	const hostname = getHostname(url ?? "");

	return cardType === undefined ? (
		<NoPreview />
	) : cardType === "summary" || image === undefined ? (
		<PreviewSummary
			image={image}
			title={title}
			description={description}
			hostname={hostname}
		/>
	) : (
		<PreviewSummaryLargeImage image={image} title={title} hostname={hostname} />
	);
}
