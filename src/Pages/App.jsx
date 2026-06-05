import { api_key } from "../constants.js";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Showcase from "../components/Showcase.jsx";

function App() {
	const [trending, setTrending] = useState([]);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [topRated, setTopRated] = useState([]);

	useEffect(() => {
		async function getTrending() {
			const rep = await fetch(`tmdb/trending/movie/day?api_key=${api_key}`);
			if (rep.ok) {
				const data = await rep.json();
				setTrending(data);
				console.log(data);
			}
		}
		getTrending();
	}, []);

	useEffect(() => {
		async function getNowPlaying() {
			const rep = await fetch(`tmdb/movie/now_playing?api_key=${api_key}`);
			if (rep.ok) {
				const data = await rep.json();
				setNowPlaying(data);
				console.log(data);
			}
		}
		getNowPlaying();
	}, []);

	useEffect(() => {
		async function getTopRated() {
			const rep = await fetch(`tmdb/movie/top_rated?api_key=${api_key}`);
			if (rep.ok) {
				const data = await rep.json();
				setTopRated(data);
				console.log(data);
			}
		}
		getTopRated();
	}, []);

	return (
		<>
			<div className="container">
				{/* <div>
					<div className="title is-1" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
						Welcome to Plex Streaming
					</div>
					<p className="subtitle is-4">
						Discover a world of entertainment with Plex Streaming. Explore our vast
						collection of movies and TV shows, all in one place. Whether you're in the
						mood for the latest blockbusters or timeless classics, Plex has something
						for everyone. Start streaming your favorites today and experience the magic
						of entertainment like never before.
					</p>
				</div> */}

				<div>
					<div className="title is-3" style={{ marginTop: "2rem" }}>
						Trending Movies
					</div>
					<Showcase key={trending?.page} trending={trending} type="movies" />
				</div>
				<div>
					<div className="title is-3" style={{ marginTop: "2rem" }}>
						Now Playing
					</div>
					<Showcase key={nowPlaying?.page} trending={nowPlaying} type="movies" />
				</div>
				<div>
					<div className="title is-3" style={{ marginTop: "2rem" }}>
						Top Rated
					</div>
					<Showcase key={topRated?.page} trending={topRated} type="movies" />
				</div>
			</div>
		</>
	);
}

export default App;
