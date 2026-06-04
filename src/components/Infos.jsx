import Cards from "../components/Cards";

function TvShowDetail({ show }) {
	if (!show) {
		return <div>Show not found</div>;
	}

	return (
		<div className="card is-shadowless">
			<div className="card-content">
				<div className="columns is-variable is-4">
					<div className="column is-narrow">
						<figure className="image" style={{ width: 500 }}>
							<img
								src={show.imgUrl}
								alt={show.title}
								style={{
									borderRadius: "var(--border-radius-md)",
								}}
							/>
						</figure>
					</div>

					<div className="column">
						<p className="title is-4 mb-1">{show.title}</p>
						<p className="has-text-grey mb-2">{show.year}</p>

						<div
							className="is-flex is-align-items-center mb-2"
							style={{ gap: "1rem" }}
						>
							<span className="tag is-size-6">
								{show.episodeCount} episodes
							</span>
							<span className="tag is-size-6">{show.rating}</span>
							<span className="ml-auto">
								{show.genres.map((g) => g.name).join(", ")}
							</span>
						</div>

						<div
							className="is-flex is-align-items-center mb-3"
							style={{ gap: "0.75rem" }}
						>
							<span className="has-text-grey">Studio</span>
							<span>{show.studio.name}</span>
						</div>

						<p>{show.plot}</p>

						<audio controls style={{ marginTop: "2rem" }}>
							<source src={show.audioUrl} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TvShowDetail;
