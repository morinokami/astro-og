import { useState } from "preact/hooks";

import { getHostname } from "../../utils";

interface BlueskyPreviewProps {
	props: Record<string, string | undefined>;
}

export function BlueskyPreview({ props }: BlueskyPreviewProps) {
	const image = props["og:image"];
	const title = props["og:title"] ?? props.title;
	const description = props["og:description"] ?? props.description;
	const url = props["og:url"];

	const hostname = getHostname(url ?? "");

	const [imgError, setImgError] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid rgb(46, 64, 82)",
				borderRadius: "12px",
				overflow: "hidden",
			}}
		>
			{image && !imgError && (
				<div
					style={{
						overflow: "hidden",
						aspectRatio: "1.91 / 1",
						position: "relative",
					}}
				>
					<div>
						<img
							src={image}
							alt=""
							style={{
								objectPosition: "left 50% top 50%",
								width: "100%",
								height: "100%",
								position: "absolute",
								left: "0px",
								top: "0px",
								objectFit: "cover",
							}}
							onError={() => setImgError(true)}
						/>
					</div>
				</div>
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: "1 1 0%",
					paddingTop: "8px",
					gap: "3px",
					...(image &&
						!imgError && {
							borderTopWidth: "1px",
							borderColor: "rgb(46, 64, 82)",
							borderTopStyle: "solid",
						}),
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "3px",
						paddingBottom: "4px",
						paddingLeft: "12px",
						paddingRight: "12px",
					}}
				>
					<div
						style={{
							webkitLineClamp: "3",
							fontSize: "15px",
							letterSpacing: "0px",
							color: "rgb(241, 243, 245)",
							fontWeight: "600",
							lineHeight: "20px",
							webkitBoxOrient: "vertical",
							textOverflow: "ellipsis",
							maxWidth: "100%",
							overflow: "hidden",
						}}
					>
						{title}
					</div>
					<div
						style={{
							webkitLineClamp: "2",
							fontSize: "13.125px",
							letterSpacing: "0px",
							color: "rgb(241, 243, 245)",
							lineHeight: "17px",
							webkitBoxOrient: "vertical",
							textOverflow: "ellipsis",
							maxWidth: "100%",
							overflow: "hidden",
						}}
					>
						{description}
					</div>
				</div>
				<div
					style={{
						paddingLeft: "12px",
						paddingRight: "12px",
					}}
				>
					<div
						style={{
							width: "100%",
							borderTopWidth: "1px",
							borderColor: "rgb(46, 64, 82)",
							borderTopStyle: "solid",
						}}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "2px",
							paddingBottom: "8px",
							paddingTop: "6px",
						}}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							width="12"
							height="12"
							style="transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.17, 0.73, 0.14, 1); transition-duration: 100ms; color: rgb(91, 119, 149);"
						>
							<title>The Earth</title>
							<path
								fill="hsl(211, 24%, 47.2%)"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.4 9.493C4.14 10.28 4 11.124 4 12a8 8 0 1 0 10.899-7.459l-.953 3.81a1 1 0 0 1-.726.727l-3.444.866-.772 1.533a1 1 0 0 1-1.493.35L4.4 9.493Zm.883-1.84L7.756 9.51l.44-.874a1 1 0 0 1 .649-.52l3.306-.832.807-3.227a7.993 7.993 0 0 0-7.676 3.597ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm8.43.162a1 1 0 0 1 .77-.29l1.89.121a1 1 0 0 1 .494.168l2.869 1.928a1 1 0 0 1 .336 1.277l-.973 1.946a1 1 0 0 1-.894.553h-2.92a1 1 0 0 1-.831-.445L9.225 14.5a1 1 0 0 1 .126-1.262l1.08-1.076Zm.915 1.913.177-.177 1.171.074 1.914 1.286-.303.607h-1.766l-1.194-1.79Z"
							/>
						</svg>
						<div
							style={{
								fontSize: "11.25px",
								letterSpacing: "0px",
								color: "rgb(147, 165, 183)",
								lineHeight: "15px",
							}}
						>
							{hostname}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
