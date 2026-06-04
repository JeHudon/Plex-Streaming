import { svrUrl } from "../constants.js";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useContext, useState, useEffect, use } from "react";
import Pagination from "../components/Pagination.jsx";
import TvShowDetail from "./TvshowDetail.jsx";
import Cards from "../components/Cards.jsx";

export function Details() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [tvshow, setTvshow] = useState(null);
	const navigate = useNavigate();

	const tvshowId = searchParams.get("tvshowId");

	// const [currentPage, setCurrentPage] = useState(1);
	// const [itemsPerPage, setItemsPerPage] = useState(
	// 	localStorage.getItem("itemsPerPage") || 8,
	// );

	// const totalPages = Math.ceil(tvshowsAffiche.length / itemsPerPage);
	// const currentItems = tvshowsAffiche.slice(
	// 	(currentPage - 1) * itemsPerPage,
	// 	currentPage * itemsPerPage,
	// );

	useEffect(() => {
		async function getTvshow() {
			const rep = await fetch(svrUrl + "/tvshow?tvshowId=" + tvshowId, {
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

export default Details;
