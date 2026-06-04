import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext.js";
import { useContext } from "react";

export function NavbarLoggedIn() {
	const { setIsLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();
	return (
		<nav
			className="navbar"
			role="navigation"
			aria-label="main navigation"
			style={{ backgroundColor: "blue" }}
		>
			<div className="navbar-menu">
				<div className="navbar-start">
					<Link
						className="navbar-item"
						style={{
							margin: "20px",
							padding: "10px",
							fontSize: "1.5em",
							marginLeft: "100px",
							color: "white",
						}}
						to="/"
					>
						Home
					</Link>
				</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<Link
								className="navbar-item"
								style={{
									margin: "20px",
									padding: "10px",
									fontSize: "1.5em",
									color: "white",
								}}
								id="history"
								to="/history"
							>
								History
							</Link>
							<Link
								className="navbar-item"
								style={{
									margin: "20px",
									padding: "10px",
									fontSize: "1.5em",
									color: "white",
								}}
								id="profile"
								to="/profile"
							>
								Profile
							</Link>
							<Link
								className="navbar-item"
								style={{
									margin: "20px",
									padding: "10px",
									fontSize: "1.5em",
									color: "white",
								}}
								id="logout"
								onClick={() => {
									localStorage.removeItem("token");
									setIsLoggedIn(false);
									navigate("/");
								}}
							>
								Logout
							</Link>
							<Link
								className="navbar-item"
								style={{
									margin: "20px",
									padding: "10px",
									fontSize: "1.5em",
									color: "white",
									marginRight: "100px",
								}}
								id="about"
								to="/about"
							>
								About
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
export default NavbarLoggedIn;
