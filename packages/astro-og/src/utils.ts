import type { OpenGraphMetadata, TwitterMetadata } from "./types";

type Metadata = {
	title?: string;
	description?: string;
	openGraph?: null | OpenGraphMetadata | undefined;
	twitter?: null | TwitterMetadata | undefined;
};

export function parse(html: string): Metadata {
	const doc = new DOMParser().parseFromString(html, "text/html");

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

export function renderTwitterPreview(
	cardType: "summary" | "summary_large_image",
	image?: string,
	title?: string,
): HTMLDivElement {
	if (cardType === "summary" || image === undefined) {
		// if image is not provided, fallback to summary card
		const previewContainer = document.createElement("div");
		previewContainer.textContent = "TODO: summary";
		return previewContainer;
	}

	const previewContainer = document.createElement("div");
	previewContainer.style.width = "100%";
	const previewWrapper = document.createElement("div");
	previewWrapper.style.padding = "24px";
	const preview = document.createElement("div");
	preview.style.background = "#13151a";
	preview.style.border = "1px solid #2f3336";
	preview.style.borderRadius = "16px";
	preview.style.overflow = "hidden";
	preview.style.position = "relative";
	const previewImageWrapper = document.createElement("div");
	previewImageWrapper.style.display = "flex";
	previewImageWrapper.style.flexDirection = "column";
	const previewImage = document.createElement("img");
	previewImage.style.aspectRatio = "1.91";
	previewImage.style.height = "auto";
	previewImage.style.maxHeight = "310px";
	previewImage.style.objectFit = "cover";
	previewImage.src = image;
	const titleContainer = document.createElement("div");
	titleContainer.style.border = "0";
	titleContainer.style.position = "absolute";
	titleContainer.style.bottom = "12px";
	titleContainer.style.left = "12px";
	titleContainer.style.right = "12px";
	titleContainer.style.fontFamily =
		"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
	const previewTitle = document.createElement("span");
	previewTitle.style.backgroundColor = "rgba(0,0,0,.77)";
	previewTitle.style.borderRadius = "4px";
	previewTitle.style.color = "#fff";
	previewTitle.style.fontSize = "13px";
	previewTitle.style.fontWeight = "500";
	previewTitle.style.height = "20px";
	previewTitle.style.lineHeight = "16px";
	previewTitle.style.maxWidth = "100%";
	previewTitle.style.overflow = "hidden";
	previewTitle.style.padding = "2px 4px";
	previewTitle.style.textOverflow = "ellipsis";
	previewTitle.style.userSelect = "none";
	previewTitle.style.whiteSpace = "nowrap";
	previewTitle.style.width = "fit-content";
	previewTitle.textContent = title ?? "Title not provided";

	titleContainer.appendChild(previewTitle);
	previewImageWrapper.appendChild(previewImage);
	previewImageWrapper.appendChild(titleContainer);
	preview.appendChild(previewImageWrapper);
	previewWrapper.appendChild(preview);
	previewContainer.appendChild(previewWrapper);

	return previewContainer;
}
