export type OpenGraphMetadata = {
	title?: string;
	description?: string;
	siteName?: string;
	image?: string;
	url?: string;
};

export type TwitterMetadata = {
	// defaults to card="summary"
	card?: "summary" | "summary_large_image"; // TODO: | "player" | "app";
	title?: string;
	description?: string;
	image?: string;
};
