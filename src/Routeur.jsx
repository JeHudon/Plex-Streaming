import { svrUrl } from "./constants.js";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./Pages/App.jsx";
import { Erreur404 } from "./Pages/Erreur404.jsx";
import { useEffect, useState } from "react";
import { NavbarNotLoggedIn } from "./components/NavbarNotLoggedIn.jsx";
import { NavbarLoggedIn } from "./components/NavbarLoggedIn.jsx";
import { LoginContext } from "./LoginContext.js";
import { Login } from "./Pages/Login.jsx";
import { Signup } from "./Pages/Signup.jsx";
import { About } from "./Pages/About.jsx";
import { History } from "./Pages/History.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { PasLoggedIn } from "./Pages/PasLoggedIn.jsx";
import { Details } from "./Pages/Details.jsx";
import { Saison } from "./Pages/Saison.jsx";
import { Episode } from "./Pages/Episode.jsx";

// Inner component — lives inside BrowserRouter so useLocation works
function AppRoutes() {
	const location = useLocation();
	const token = localStorage.getItem("token");

	const [isLoggedIn, setIsLoggedIn] = useState(() => token !== null);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		async function getHistory() {
			const rep = await fetch(svrUrl + "/user/history", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			});
			if (rep.ok) {
				const data = await rep.json();
				setHistory(data);
			}
		}
		getHistory();
	}, [token, location.pathname]);

	const objetsEtMethodesDuContexte = { isLoggedIn, setIsLoggedIn, history };

	return (
		<LoginContext.Provider value={objetsEtMethodesDuContexte}>
			{isLoggedIn ? <NavbarLoggedIn /> : <NavbarNotLoggedIn />}
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/about" element={<About />} />
				<Route path="/tvshow" element={<Details />} />
				<Route path="/saison" element={<Saison />} />
				<Route path="/episode" element={isLoggedIn ? <Episode /> : <PasLoggedIn />} />
				<Route path="/history" element={isLoggedIn ? <History /> : <PasLoggedIn />} />
				<Route path="/profile" element={isLoggedIn ? <Profile /> : <PasLoggedIn />} />
				<Route path="*" element={<Erreur404 />} />
			</Routes>
		</LoginContext.Provider>
	);
}

// Outer component — just provides the BrowserRouter
export function Routeur() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}
