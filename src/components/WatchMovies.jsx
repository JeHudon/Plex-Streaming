import React, { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

const url = "https://player.videasy.to/movie/";
const url1 = "https://111movies.net/movie/";

function WatchMovies({ tmdbId }) {
	const [source, setSource] = useState(url);
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div className="container">
			<div className="mt-5 mb-5" style={{ position: "relative" }}>
				<div
					className="button is-dark"
					onClick={() => {
						searchParams.delete("streaming");
						setSearchParams(searchParams);
					}}
					type="button"
					style={{ position: "absolute", top: 0, left: 0 }}
				>
					<span className="icon">
						<i className="fa-solid fa-arrow-left" />
					</span>
				</div>

				<div className="is-flex is-justify-content-center">
					<button
						onClick={() => setSource(source === url ? url1 : url)}
						className="button is-link"
					>
						{source === url ? "Switch to 111movies" : "Switch to Videasy"}
					</button>
				</div>
			</div>

			<div
				className="is-flex is-justify-content-center is-align-items-center is-flex-direction-column"
				style={{ width: "100%" }}
			>
				<iframe
					src={`${source}${tmdbId}`}
					style={{ width: "100%", aspectRatio: "16/9", border: "none" }}
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default WatchMovies;
