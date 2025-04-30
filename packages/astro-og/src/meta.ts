import type { OpenGraphMetadata, TwitterMetadata } from "./types";

type Metadata = {
	title?: string;
	description?: string;
	openGraph?: null | OpenGraphMetadata | undefined;
	twitter?: null | TwitterMetadata | undefined;
};

export function parse(head: string): Metadata {
	const doc = new DOMParser().parseFromString(head, "text/html");

	// Helper function to get meta tag content
	const getMeta = (name: string): string | undefined => {
		const metaName = doc.querySelector(`meta[name="${name}"]`);
		if (metaName?.hasAttribute("content")) {
			return metaName.getAttribute("content") || undefined;
		}

		const metaProperty = doc.querySelector(`meta[property="${name}"]`);
		if (metaProperty?.hasAttribute("content")) {
			return metaProperty.getAttribute("content") || undefined;
		}

		return undefined;
	};

	const titleTag = doc.querySelector("title");
	const title = titleTag?.textContent ?? undefined;
	const descriptionMeta = getMeta("description");

	const ogTitle = getMeta("og:title");
	const ogDescription = getMeta("og:description");
	const ogSiteName = getMeta("og:site_name");
	const ogImageUrl = getMeta("og:image");
	const ogUrl = getMeta("og:url");

	const twitterCard = getMeta("twitter:card") as
		| TwitterMetadata["card"]
		| undefined;
	const twitterTitle = getMeta("twitter:title");
	const twitterDescription = getMeta("twitter:description");
	const twitterImageUrl = getMeta("twitter:image");

	return {
		title: title,
		description: descriptionMeta,
		openGraph: {
			title: ogTitle,
			url: ogUrl,
			image: ogImageUrl,
			description: ogDescription,
			siteName: ogSiteName,
		},
		twitter: {
			card: twitterCard,
			description: twitterDescription,
			title: twitterTitle,
			image: twitterImageUrl,
		},
	};
}
