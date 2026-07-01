import { api_key, dateFormatter, token } from "../constants.js";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import ShowcaseCards from "../components/ShowcaseCards.jsx";
import CastCell from "../components/CastCell.jsx";
import WatchMovies from "../components/WatchMovies.jsx";

export function MovieDetails() {
	const [movie, setMovie] = useState(null);
	const [credits, setCredits] = useState(null);
	const [videos, setVideos] = useState(null);

	const trailer = videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer");

	const [searchParams, setSearchParams] = useSearchParams();

	const streaming = searchParams.get("streaming") === "true";

	const idName = useParams("id");
	const id = idName.id.split("-")[0];

	useEffect(() => {
		async function getData() {
			const [movieRes, creditsRes, videosRes] = await Promise.all([
				fetch(`/tmdb/movie/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
				fetch(`/tmdb/movie/${id}/credits`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				fetch(`/tmdb/movie/${id}/videos`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);
			// console.log(await videosRes.json());
			setMovie(await movieRes.json());
			setCredits(await creditsRes.json());
			setVideos(await videosRes.json());
		}
		getData();
	}, [id]);

	return (
		<>
			<div className={"container is-fluid"} style={streaming ? { display: "none" } : {}}>
				<div className="card is-shadowless">
					<div className="card-content">
						<div className="columns is-variable is-4">
							<div className="column is-narrow">
								<figure className="image" style={{ width: 420 }}>
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
									{movie?.production_companies.map((c) =>
										c.logo_path ? (
											<img
												key={c.id}
												src={`https://image.tmdb.org/t/p/w92/${c.logo_path}`}
												alt={c.name}
												style={{
													filter: c.logo_path?.endsWith(".jpg")
														? "none"
														: "brightness(0) invert(1)",
												}}
											/>
										) : (
											<p className="subtitle is-6">{c.name}</p>
										),
									)}
								</div>

								<p className="mb-4">
									<i className="fa-regular fa-calendar-days"></i>{" "}
									{movie?.release_date
										? dateFormatter.format(new Date(movie.release_date))
										: ""}{" "}
									{movie?.origin_country ? `(${movie.origin_country[0]})` : ""}
								</p>

								<p className="mb-4">
									<i className="fa-regular fa-clock"></i>{" "}
									{movie?.runtime
										? `${movie.runtime} minutes (${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m)`
										: ""}{" "}
								</p>

								<div
									className="is-flex is-align-items-center mb-3"
									style={{ gap: "0.5rem", flexWrap: "wrap" }}
								>
									{movie?.genres.map((g) => (
										<span
											key={g.id}
											className="tag is-size-6 is-rounded py-5 px-4"
										>
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

								<div className="mb-5">
									<button
										className="tag is-size-6 is-rounded py-5 px-6 is-link"
										style={{ gap: "0.5rem" }}
										onClick={() => setSearchParams({ streaming: true })}
									>
										<i className="fa-solid fa-play"></i> Watch
									</button>
								</div>

								<p className="subtitle is-6">{movie?.overview}</p>

								{trailer && (
									<iframe
										src={`https://www.youtube.com/embed/${trailer.key}`}
										style={{
											width: "100%",
											aspectRatio: "16/9",
											border: "none",
										}}
										allowFullScreen
									/>
								)}
							</div>
							<div className="column is-narrow" style={{ width: "300px" }}>
								<h2 className="title is-4 mb-3">Cast & Crew</h2>
								<div style={{ maxHeight: "600px", overflowY: "auto" }}>
									{credits?.cast.map((c) => (
										<CastCell
											key={c.id}
											name={c.name}
											profile_path={c.profile_path}
											role={c.character}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{streaming && <WatchMovies tmdbId={id} />}
		</>
	);
}

export default MovieDetails;
