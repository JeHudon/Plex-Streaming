import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../LoginContext";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";

export function History() {
	const { history } = useContext(LoginContext);

	return (
		<div className="container has-text-centered">
			<h1 className="title is-1">History</h1>

			<div className="columns is-multiline is-mobile">
				{history?.map((episode) => (
					<Cards
						key={episode.episodeId}
						img={episode.imgUrl}
						tvshowLink={
							<Link to={"/tvshow?tvshowId=" + episode.tvshowId}>
								{episode.tvshowTitle}
							</Link>
						}
						saisonLink={
							<Link to={"/saison?saisonId=" + episode.seasonId}>
								Saison {episode.seasonNumber}
							</Link>
						}
						episodeLink={
							<Link to={"/episode?episodeId=" + episode.episodeId}>
								{episode.episodeTitle}
							</Link>
						}
						description={null}
						size="4"
                        fontSize="1.5em"
					/>
				))}
			</div>
		</div>
	);
}

export default History;
