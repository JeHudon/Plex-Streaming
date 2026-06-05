import { Link } from "react-router-dom";
import ShowcaseCards from "./ShowcaseCards.jsx";

export function Showcase(props) {
	return (
		<div className="card is-shadowless">
			<div className="card-content">
				<div
						className="columns"
						style={{
							overflowX: "auto",
							flexWrap: "nowrap",
						}}
				>
					{props.trending?.results?.map((r) => (
						<ShowcaseCards
							key={r.id}
							size="2"
							img={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
							to={`/${props.type}/${r.id}-${(props.type === "movies" ? r.title : r.name).replace(/\s+/g, "-").toLowerCase()}`}
							vote_average={r.vote_average}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Showcase;
