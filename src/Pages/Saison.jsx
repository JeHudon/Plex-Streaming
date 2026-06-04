import { svrUrl } from "../constants.js";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Pagination from "../components/Pagination.jsx";
import Cards from "../components/Cards.jsx";
import { LoginContext } from "../LoginContext.js";

export function Saison() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [episodes, setEpisodes] = useState(null);
	const { history } = useContext(LoginContext);

	const seasonId = searchParams.get("seasonId");

	useEffect(() => {
		async function getEpisodes() {
			const rep = await fetch(svrUrl + "/episodes?seasonId=" + seasonId, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setEpisodes(data);
				console.log(episodes);
			}
		}
		getEpisodes();
	}, [seasonId]);

	return (
		<div className="container has-text-centered">
			<h1 className="title is-1">{episodes?.tvshowTitle}</h1>
			<h2 className="title is-2">{episodes?.seasonNumber}</h2>

			<div className="columns is-multiline is-mobile">
				{episodes?.episodes.map((episode) => (
					<Cards
						img={episode.imgUrl}
						title={episode.title}
						description={episode.number}
						size="3"
						to={"/episode?episodeId=" + episode.episodeId}
						seen={history.some((h) => h.episodeId === episode.episodeId)}
					/>
				))}
			</div>
		</div>
	);
}

export default Saison;
