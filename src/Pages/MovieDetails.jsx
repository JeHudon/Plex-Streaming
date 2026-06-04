import { api_key } from "../constants.js";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import Cards from "../components/Cards.jsx";

export function MovieDetails() {
	const [movie, setMovie] = useState(null);

	const idName = useParams("id");
	const id = idName.id.split("-")[0]

	useEffect(() => {
		async function getMovie() {
			const rep = await fetch(`/tmdb/movie/${id}?api_key=${api_key}`);
			if (rep.ok) {
				const data = await rep.json();
				setMovie(data);
				console.log(data);
			}
		}
		getMovie();
	}, [id]);

	return (
		<div className="container">
			<p>Penis</p>
			{/* <MovieDetail movie={movie} /> */}
			{/* <div className="card is-shadowless">
				<div className="card-content">
					<div
						className="columns"
						style={{
							overflowX: "auto",
							flexWrap: "nowrap",
							marginTop: "2rem",
						}}
					>
						{movie?.credits.cast.map((actor) => (
							<Cards
								img={actor.profile_path}
								description={actor.character}
								title={actor.name}
								size="2"
								fontSize="0.8rem"
								key={actor.id}
							/>
						))}
					</div>
				</div>
			</div> */}

			{/* <div className="card is-shadowless">
				<div className="card-content">
					<div
						className="row columns is-multiline is-mobile"
						style={{
							marginTop: "2rem",
						}}
					>
						{tvshow?.seasons.map((season) => (
							<Cards
								img={season.imgUrl}
								description={season.episodeCount + " episodes"}
								title={"Season " + season.number}
								size="4"
								fontSize="2em"
								key={season.seasonId}
								to={"/saison?seasonId=" + season.seasonId}
							/>
						))}
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default MovieDetails;
