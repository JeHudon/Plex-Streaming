import { svrUrl } from "../constants.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Episode() {
	const [searchParams, setSearchParams] = useSearchParams();

	const episodeId = searchParams.get("episodeId");

	const [episode, setEpisode] = useState(null);
	const token = localStorage.getItem("token");

	const [movie, setMovie] = useState(null);

	useEffect(() => {
		async function getEpisode() {
			const rep = await fetch(svrUrl + "/viewepisode?episodeId=" + episodeId, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setEpisode(data);
			}
		}
		getEpisode();
	}, [episodeId, token]);

	useEffect(() => {
		async function getMovie() {
			const res = await fetch(`/api/movie/533535`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			if (res.ok) {
				const data = await res.json();
				setMovie(data);
				console.log(data);
			}
		}
		getMovie();
	}, []);

	return (
		<div
			className="is-flex is-justify-content-center is-align-items-center"
			style={{ width: "100vw", height: "89vh" }}
		>
			{/* {episode?.videoUrl ? (
				<video
					key={episode.videoUrl}
					src="https://111movies.net/movie/533535"
					style={{ width: "80vw", height: "80vh" }}
					controls
				/>
			) : (
				<p>Loading video...</p>
			)} */}
			<iframe
				src="https://111movies.net/movie/533535"
				style={{ width: "80vw", height: "80vh" }}
				allowFullScreen
			/>
		</div>
	);
}

export default Episode;
