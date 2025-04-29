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
	cardType?: "summary" | "summary_large_image",
	image?: string,
	title?: string,
	description?: string,
): HTMLDivElement {
	const previewContainer = document.createElement("div");
	previewContainer.style.width = "100%";
	const previewWrapper = document.createElement("div");
	previewWrapper.style.padding = "24px";

	if (cardType === undefined) {
		const preview = document.createElement("div");
		preview.style.display = "flex";
		preview.style.flexDirection = "column";
		preview.style.justifyContent = "center";
		preview.style.alignItems = "center";
		preview.style.height = "100%";
		preview.style.width = "100%";
		const noPreviewWrapper = document.createElement("div");
		noPreviewWrapper.style.display = "flex";
		noPreviewWrapper.style.alignItems = "center";
		const warningIcon = document.createElement("astro-dev-toolbar-icon");
		warningIcon.icon = "warning";
		warningIcon.style.color = "#ff9f1c";
		warningIcon.style.marginRight = "4px";
		warningIcon.style.width = "16px";
		warningIcon.style.height = "16px";
		const noPreview = document.createElement("p");
		noPreview.textContent = "No preview available";
		noPreview.style.textAlign = "center";
		noPreview.style.color = "#71767b";
		const noPreviewDescription = document.createElement("p");
		noPreviewDescription.innerHTML =
			"Property <code>twitter:card</code> is required. Must be one of <code>summary</code>, <code>summary_large_image</code>, <code>app</code> or <code>player</code>.";
		noPreviewDescription.style.textAlign = "start";
		noPreviewDescription.style.marginTop = "16px";
		noPreviewDescription.style.lineHeight = "2.2";
		noPreviewDescription.style.maxWidth = "380px";
		noPreviewDescription.style.fontSize = "14px";

		noPreviewWrapper.appendChild(warningIcon);
		noPreviewWrapper.appendChild(noPreview);
		preview.appendChild(noPreviewWrapper);
		preview.appendChild(noPreviewDescription);
		previewWrapper.appendChild(preview);
		previewContainer.appendChild(previewWrapper);

		return previewContainer;
	}

	if (cardType === "summary" || image === undefined) {
		// if image is not provided, fallback to summary card
		const preview = document.createElement("div");
		preview.style.display = "flex";
		preview.style.border = "1px solid #2f3336";
		preview.style.borderRadius = "16px";
		preview.style.fontFamily =
			"TwitterChirp,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
		preview.style.fontSize = "15px";
		preview.style.fontWeight = "400";
		preview.style.height = "130px";
		preview.style.lineHeight = "20px";
		preview.style.overflow = "hidden";
		preview.style.position = "relative";
		preview.style.userSelect = "none";
		preview.style.width = "100%";
		const previewImageWrapper = document.createElement("div");
		previewImageWrapper.style.alignItems = "center";
		previewImageWrapper.style.display = "flex";
		previewImageWrapper.style.background = "#16181c";
		previewImageWrapper.style.borderRight = "1px solid #2f3336";
		previewImageWrapper.style.flexShrink = "0";
		previewImageWrapper.style.justifyContent = "center";
		previewImageWrapper.style.position = "relative";
		previewImageWrapper.style.userSelect = "none";
		previewImageWrapper.style.width = "130px";
		previewImageWrapper.style.flexDirection = "column";
		const previewImage = document.createElement("img");
		previewImage.style.height = "100%";
		previewImage.style.left = "0";
		previewImage.style.objectFit = "cover";
		previewImage.style.position = "absolute";
		previewImage.style.top = "0";
		previewImage.style.width = "100%";
		previewImage.style.aspectRatio = "16 / 9";
		previewImage.style.maxHeight = "310px";
		previewImage.src = image ?? ""; // TODO: Show fallback image if image not loaded
		const summaryContainer = document.createElement("div");
		summaryContainer.style.display = "flex";
		summaryContainer.style.flexDirection = "column";
		summaryContainer.style.flex = "1 1";
		summaryContainer.style.justifyContent = "center";
		summaryContainer.style.gap = "2px";
		summaryContainer.style.padding = "12px";
		summaryContainer.style.minWidth = "0";
		const host = document.createElement("span");
		host.style.overflow = "hidden";
		host.style.textWrap = "nowrap";
		host.style.whiteSpace = "nowrap";
		host.style.color = "#71767b";
		host.textContent = document.location.host;
		const metadataContainer = document.createElement("div");
		metadataContainer.style.flexShrink = "0";
		const titleContainer = document.createElement("span");
		titleContainer.style.color = "#e7e9ea";
		titleContainer.style.overflow = "hidden";
		titleContainer.style.textWrap = "nowrap";
		titleContainer.style.whiteSpace = "nowrap";
		titleContainer.style.display = "block";
		titleContainer.textContent = title ?? "Title not provided";
		const descriptionContainer = document.createElement("span");
		descriptionContainer.style.webkitLineClamp = "2";
		descriptionContainer.style.color = "#71767b";
		descriptionContainer.style.wordWrap = "break-word";
		descriptionContainer.style.display = "-webkit-box";
		descriptionContainer.style.maxWidth = "100%";
		descriptionContainer.style.minWidth = "0";
		descriptionContainer.style.overflow = "hidden";
		descriptionContainer.style.webkitBoxOrient = "vertical";
		descriptionContainer.textContent =
			description ?? "Description not provided";

		previewImageWrapper.appendChild(previewImage);
		metadataContainer.appendChild(titleContainer);
		metadataContainer.appendChild(descriptionContainer);
		summaryContainer.appendChild(host);
		summaryContainer.appendChild(metadataContainer);
		preview.appendChild(previewImageWrapper);
		preview.appendChild(summaryContainer);
		previewWrapper.appendChild(preview);
		previewContainer.appendChild(previewWrapper);

		return previewContainer;
	}

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

export function closeOnOutsideClick(eventTarget: EventTarget) {
	function onPageClick(event: MouseEvent) {
		const target = event.target as Element | null;
		if (!target) return;
		if (!target.closest) return;
		if (target.closest("astro-dev-toolbar")) return;
		eventTarget.dispatchEvent(
			new CustomEvent("toggle-app", {
				detail: {
					state: false,
				},
			}),
		);
	}
	// biome-ignore lint/suspicious/noExplicitAny:
	eventTarget.addEventListener("app-toggled", (event: any) => {
		if (event.detail.state === true) {
			document.addEventListener("click", onPageClick, true);
		} else {
			document.removeEventListener("click", onPageClick, true);
		}
	});
}
