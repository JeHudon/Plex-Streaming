import { Link } from "react-router-dom";
import { RatingBadge } from "./RatingBadge.jsx";

export function ShowcaseCards(props) {
	return (
		<div
			className={"column is-" + props.size}
			style={{
				textAlign: "center",
				flexShrink: 0,
				padding: "0.5rem",
			}}
		>
			<Link {...(props.to ? { to: props.to } : {})}>
				<div className="card" style={{ position: "relative" }}>
					<div className="card-img">
						<div style={{ position: "absolute", top: "8px", left: "8px", zIndex: 1 }}>
							<RatingBadge score={props.vote_average} />
						</div>
						<img
							src={props.img}
							style={{
								objectFit: "cover",
								margin: "0",
								display: "block",
								width: "100%",
								borderRadius: "8px",
							}}
						/>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ShowcaseCards;
