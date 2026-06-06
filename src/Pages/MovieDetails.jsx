import { api_key, dateFormatter, token } from "../constants.js";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import ShowcaseCards from "../components/ShowcaseCards.jsx";
import CastCell from "../components/CastCell.jsx";

export function MovieDetails() {
	const [movie, setMovie] = useState(null);
	const [credits, setCredits] = useState(null);

	const idName = useParams("id");
	const id = idName.id.split("-")[0];

	useEffect(() => {
		async function getMovie() {
			const rep = await fetch(`/tmdb/movie/${id}`, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setMovie(data);
				console.log(data);
			}
		}
		getMovie();
	}, [id]);

	useEffect(() => {
		async function getMovie() {
			const rep = await fetch(`/tmdb/movie/${id}/credits`, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setCredits(data);
				console.log(data);
			}
		}
		getMovie();
	}, [id]);

	return (
		<div className="container is fluid">
			<div className="card is-shadowless">
				<div className="card-content">
					<div className="columns is-variable is-4">
						<div className="column is-narrow">
							<figure className="image" style={{ width: 400 }}>
								<ShowcaseCards
									key={movie?.id}
									img={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
									to={`/movies/${movie?.id}-${movie?.title.replace(/\s+/g, "-").toLowerCase()}`}
									vote_average={movie?.vote_average}
								/>
							</figure>
						</div>

						<div className="column">
							<h1 className="title is-1 mb-1">{movie?.title}</h1>

							<div
								className="is-flex is-align-items-center mb-3"
								style={{ gap: "2rem" }}
							>
								{movie?.production_companies.map((c) => (
									<img
										key={c.id}
										src={`https://image.tmdb.org/t/p/w92/${c.logo_path}`}
										alt={c.name}
										style={{ filter: "brightness(0) invert(1)" }}
									/>
								))}
							</div>

							<p className="mb-4">
								<i class="fa-regular fa-calendar-days"></i>{" "}
								{movie?.release_date
									? dateFormatter.format(new Date(movie.release_date))
									: ""}{" "}
								{movie?.origin_country ? `(${movie.origin_country[0]})` : ""}
							</p>

							<p className="mb-4">
								<i class="fa-regular fa-clock"></i>{" "}
								{movie?.runtime
									? `${movie.runtime} minutes (${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m)`
									: ""}{" "}
							</p>

							<div
								className="is-flex is-align-items-center mb-3"
								style={{ gap: "0.5rem", flexWrap: "wrap" }}
							>
								{movie?.genres.map((g) => (
									<span key={g.id} className="tag is-size-6 is-rounded py-5 px-4">
										{g.name}
									</span>
								))}
							</div>

							<div
								className="is-flex is-align-items-center mb-3"
								style={{ gap: "1rem", flexWrap: "wrap" }}
							>
								{credits?.crew
									.filter((c) => c.job === "Director")
									.map((d) => (
										<CastCell
											key={d.id}
											name={d.name}
											profile_path={d.profile_path}
											role={d.job}
										/>
									))}
							</div>

							<div className="mb-5" >
								<span className="tag is-size-6 is-rounded py-5 px-6 is-link" style={{ gap: "0.5rem" }}>
									<i class="fa-solid fa-play"></i> 
									{" "}
									Watch
								</span>
							</div>

							<p>{movie?.overview}</p>
						</div>
					</div>
				</div>
			</div>
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
