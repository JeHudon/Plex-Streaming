import { svrUrl } from "./constants.js";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./Pages/App.jsx";
import { Erreur404 } from "./Pages/Erreur404.jsx";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
// import { History } from "./Pages/History.jsx";
import { Details } from "./Pages/Details.jsx";
import { Saison } from "./Pages/Saison.jsx";
import { Episode } from "./Pages/Episode.jsx"; 

export function Routeur() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/tvshow" element={<Details />} />
				<Route path="/saison" element={<Saison />} />
				<Route path="/episode" element={<Episode />} />
				{/* <Route path="/history" element={<History />} /> */}
				<Route path="*" element={<Erreur404 />} />
			</Routes>
		</BrowserRouter>
	);
}
