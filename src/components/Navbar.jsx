import { Link } from "react-router-dom";

export function Navbar() {
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
						Movies
					</Link>
					<Link
						className="navbar-item"
						style={{
							margin: "20px",
							padding: "10px",
							fontSize: "1.5em",
							marginLeft: "100px",
							color: "white",
						}}
						to="/tv"
					>
						TV
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
								id="log-in"
								data-purpose="login"
								to="/login"
							>
								Log in
							</Link>
							<Link
								className="navbar-item"
								style={{
									margin: "20px",
									padding: "10px",
									fontSize: "1.5em",
									color: "white",
								}}
								id="signup"
								data-purpose="signup"
								to="/signup"
							>
								Signup
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
