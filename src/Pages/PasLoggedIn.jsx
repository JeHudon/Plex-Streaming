import { Link } from "react-router-dom";

export function PasLoggedIn() {
	return (
		<div className="container">
			<div className="section has-text-centered">
				<h1 className="is-1 title has-text-centered">
					VOUS DEVEZ ETRE CONNECTÉ POUR VOIR CE CONTENU
				</h1>
				<Link
          className="button is-text"
					style={{
						margin: "20px",
						padding: "10px",
						fontSize: "1.5em",
					}}
					id="login"
					to="/login"
				>
					Se connecter
				</Link>
			</div>
		</div>
	);
}
