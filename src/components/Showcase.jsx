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
					{props.trending?.results?.map((movie) => (
						<ShowcaseCards
							key={movie.id}
							size="3"
							img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							to={`/movies/${movie.id}-${movie.title.replace(/\s+/g, "-").toLowerCase()}`}
							vote_average={movie.vote_average}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Showcase;
