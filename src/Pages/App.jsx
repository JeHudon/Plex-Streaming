import { svrUrl } from "../constants.js";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Pagination from "../components/Pagination.jsx";

function App() {
	const [tvshows, setTvshows] = useState([]);
	const [tvshowsAffiche, setTvshowsAffiche] = useState([]);
	const [studios, setStudios] = useState([]);
	const [titleFiltre, setTitleFiltre] = useState("");
	const [studioFiltre, setStudioFiltre] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		localStorage.getItem("itemsPerPage") || 8,
	);

	const totalPages = Math.ceil(tvshowsAffiche.length / itemsPerPage);
	const currentItems = tvshowsAffiche.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	useEffect(() => {
		async function getTvshows() {
			const rep = await fetch(svrUrl + "/tvshows", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setTvshows(data);
				setTvshowsAffiche(data);
			}
		}
		getTvshows();
	}, []);

	useEffect(() => {
		async function getStudios() {
			const rep = await fetch(svrUrl + "/studios", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setStudios(data);
			}
		}
		getStudios();
	}, []);

	function Filtre(titreValue, studioValue) {
		let data = tvshows.filter(
			(a) =>
				(!titreValue ||
					a.titre.toLowerCase().includes(titreValue.toLowerCase())) &&
				(!studioValue || a.studio.studioId == studioValue),
		);
		setTvshowsAffiche(data);
	}

	return (
		<>
			<div className="container">
				<div
					className="is-flex is-align-items-center is-justify-content-center is-flex-wrap-wrap"
					style={{ gap: "1.5rem", marginTop: 50 }}
				>
					{/* Title */}
					<div
						className="is-flex is-align-items-center"
						style={{ gap: "0.5rem" }}
					>
						<label htmlFor="title" style={{ whiteSpace: "nowrap" }}>
							Title:
						</label>
						<input
							type="text"
							id="title"
							className="input"
							style={{ width: 220 }}
							placeholder="Name"
							onChange={(e) => {
								setTitleFiltre(e.target.value);
								Filtre(e.target.value, studioFiltre);
							}}
						/>
					</div>

					{/* Studio */}
					<div
						className="is-flex is-align-items-center"
						style={{ gap: "0.5rem" }}
					>
						<label
							htmlFor="studio"
							style={{ whiteSpace: "nowrap" }}
						>
							Studio:
						</label>
						<div className="select">
							<select
								id="studio"
								value={studioFiltre}
								style={{ width: 220 }}
								onChange={(e) => {
									setStudioFiltre(e.target.value);
									Filtre(titleFiltre, e.target.value);
								}}
							>
								<option></option>
								<hr />
								{studios.map((s) => (
									<option key={s.studioId} value={s.studioId}>
										{s.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Tv Shows */}
				<div className="columns is-multiline" style={{ marginTop: 50 }}>
					{currentItems.map((s) => {
						return (
							<div
								className="column is-3-desktop is-4-tablet is-6-mobile"
								key={s.tvshowId}
							>
								<Link to={`/tvshow?tvshowId=${s.tvshowId}`}>
									<div className="card large">
										<div className="card-image">
											<figure className="image">
												<img
													src={s.imgUrl}
													alt={s.title}
												/>
											</figure>
										</div>
										<div className="card-content">
											<div className="media">
												<div className="media-content">
													<p className="title is-4 no-padding">
														{s.title}
													</p>
													<p className="subtitle is-6">
														<span className="has-text-weight-bold">
															Studio:{" "}
														</span>
														{s.studio.name}
														<br />
														<span className="has-text-weight-bold">
															Genres:{" "}
														</span>
														{s.genres
															.map((g) => g.name)
															.join(", ")}
													</p>
												</div>
											</div>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>

				<div className="has-text-centered">
					<div className="select" style={{ marginLeft: "1rem" }}>
						<select
							value={itemsPerPage}
							onChange={(e) => {
								setItemsPerPage(Number(e.target.value));
								setCurrentPage(1);
								localStorage.setItem(
									"itemsPerPage",
									e.target.value,
								);
							}}
						>
							<option>4</option>
							<option>8</option>
							<option>12</option>
							<option>16</option>
						</select>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
