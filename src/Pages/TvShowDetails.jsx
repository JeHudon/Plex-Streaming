import { api_key } from "../constants.js";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import Cards from "../components/Cards.jsx";

export function TvShowDetails() {
	const [tvshow, setTvshow] = useState(null);

	const id = useParams("id");


	useEffect(() => {
		async function getTvshow() {
			const rep = await fetch(`/tmdb/tv/${id}?api_key=${api_key}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setTvshow(data);
			}
		}
		getTvshow();
	}, [tvshowId]);

	return (
		<div className="container">
			<TvShowDetail show={tvshow} />
			<div className="card is-shadowless">
				<div className="card-content">
					<div
						className="columns"
						style={{
							overflowX: "auto",
							flexWrap: "nowrap",
							marginTop: "2rem",
						}}
					>
						{tvshow?.roles.map((role) => (
							<Cards
								img={role.imgUrl}
								description={role.character}
								title={role.name}
								size="2"
								fontSize="0.8rem"
								key={role.roleId}
							/>
						))}
					</div>
				</div>
			</div>

			<div className="card is-shadowless">
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
			</div>
		</div>
	);
}

export default TvShowDetails;
