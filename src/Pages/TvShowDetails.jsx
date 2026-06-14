import { api_key, dateFormatter, token } from "../constants.js";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import ShowcaseCards from "../components/ShowcaseCards.jsx";
import CastCell from "../components/CastCell.jsx";
import WatchTvShows from "../components/WatchTvShows.jsx";

export function TvShowDetails() {
	const [tvShow, setTvShow] = useState(null);
	const [credits, setCredits] = useState(null);

	const [searchParams, setSearchParams] = useSearchParams();

	const streaming = searchParams.get("streaming") === "true";

	const idName = useParams("id");
	const id = idName.id.split("-")[0];

	useEffect(() => {
		async function getData() {
			const [tvShowRes, creditsRes] = await Promise.all([
				fetch(`/tmdb/tv/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
				fetch(`/tmdb/tv/${id}/aggregate_credits`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);
			setTvShow(await tvShowRes.json());
			setCredits(await creditsRes.json());
		}
		getData();
	}, [id]);

	useEffect(() => {
		console.log(tvShow);
	}, [tvShow]);

	useEffect(() => {
		console.log(credits);
	}, [credits]);

	return (
		<>
			<div className={"container is-fluid"} style={streaming ? { display: "none" } : {}}>
				<div className="card is-shadowless">
					<div className="card-content">
						<div className="columns is-variable is-4">
							<div className="column is-narrow">
								<figure className="image" style={{ width: 420 }}>
									<ShowcaseCards
										key={tvShow?.id}
										img={`https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`}
										to={`/tv/${tvShow?.id}-${tvShow?.name.replace(/\s+/g, "-").toLowerCase()}`}
										vote_average={tvShow?.vote_average}
									/>
								</figure>
							</div>

							<div className="column">
								<h1 className="title is-1 mb-1">{tvShow?.name}</h1>

								<div
									className="is-flex is-align-items-center mb-3"
									style={{ gap: "2rem" }}
								>
									{tvShow?.production_companies.map((c) => (
										<img
											key={c.id}
											src={`https://image.tmdb.org/t/p/w92${c.logo_path}`}
											alt={c.name}
											style={{
												filter: c.logo_path.endsWith(".jpg")
													? "none"
													: "brightness(0) invert(1)",
											}}
										/>
									))}
								</div>

								<p className="mb-4">
									<i className="fa-regular fa-calendar-days"></i>{" "}
									{tvShow?.first_air_date
										? dateFormatter.format(new Date(tvShow.first_air_date))
										: ""}{" "}
									{tvShow?.origin_country ? `(${tvShow.origin_country[0]})` : ""}
								</p>

								<p className="mb-4">
									<i class="fa-solid fa-tv"></i>{" "}
									{tvShow?.number_of_seasons && tvShow?.number_of_episodes
										? `${tvShow.number_of_seasons} seasons (${tvShow.number_of_episodes} episodes)`
										: ""}{" "}
								</p>

								<div
									className="is-flex is-align-items-center mb-3"
									style={{ gap: "0.5rem", flexWrap: "wrap" }}
								>
									{tvShow?.genres.map((g) => (
										<span
											key={g.id}
											className="tag is-size-6 is-rounded py-5 px-4"
										>
											{g.name}
										</span>
									))}
								</div>

								{/* <div
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
								</div> */}

								<div className="mb-5">
									<button
										className="tag is-size-6 is-rounded py-5 px-6 is-link"
										style={{ gap: "0.5rem" }}
										onClick={() => setSearchParams({ streaming: true })}
									>
										<i className="fa-solid fa-play"></i> Watch
									</button>
								</div>

								<div className="title is-3" style={{ marginTop: "2rem" }}>
									Overview
								</div>

								<p>{tvShow?.overview}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{streaming && <WatchTvShows tmdbId={id} />}
		</>
	);
}

export default TvShowDetails;
