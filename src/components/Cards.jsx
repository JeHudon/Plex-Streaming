import { Link } from "react-router-dom";

export function Cards(props) {
	const Wrapper = props.to ? Link : "div";

	return (
		<div
			className={"column is-" + props.size}
			style={{
				textAlign: "center",
				flexShrink: 0,
				padding: "0.5rem",
			}}
		>
			<Wrapper {...(props.to ? { to: props.to } : {})}>
				<div className="card" style={{ position: "relative" }}>
					{/* Blur overlay if already seen */}
					{props.seen && (
						<div
							style={{
								position: "absolute",
								inset: 0,
								backdropFilter: "blur(2px)",
								backgroundColor: "rgba(0,0,0,0.4)",
								borderRadius: "8px",
								zIndex: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>
								✓ Déjà vu
							</span>
						</div>
					)}

					<div className="card-img">
						<img
							src={props.img}
							style={{
								objectFit: "cover",
								margin: "0",
								display: "block", // removes inline spacing below image
								width: "100%", // fill the card width
								borderRadius: "8px"
							}}
						/>
					</div>

					<div className="card-content">
						<p
							style={{
								fontSize: props.fontSize || "1rem",
								fontWeight: 600,
								margin: "0 0 2px",
							}}
						>
							{props.title}
						</p>

						{/* Extra links for History */}
						{props.tvshowLink && (
							<p style={{ fontSize: "1.2rem", margin: "2px 0" }}>
								{props.tvshowLink}
							</p>
						)}
						{props.saisonLink && (
							<p style={{ fontSize: "1.2rem", margin: "2px 0" }}>
								{props.saisonLink}
							</p>
						)}
						{props.episodeLink && (
							<p style={{ fontSize: "1.2rem", margin: "2px 0" }}>
								{props.episodeLink}
							</p>
						)}

						<p
							style={{
								fontSize: props.fontSize || "1rem",
								color: "#7a7a7a",
							}}
						>
							{props.description}
						</p>
					</div>
				</div>
			</Wrapper>
		</div>
	);
}

export default Cards;
