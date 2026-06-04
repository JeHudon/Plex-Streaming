import { svrUrl } from "../constants.js";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext.js";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState([]);
	const errorMessageRef = useRef();

	const [error, setError] = useState(null);
	const { setIsLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (errorMessage.length !== 0) {
			console.log("focus");
			errorMessageRef.current?.focus();
		}
	}, [errorMessage]);

	function annuler() {
		setEmail("");
		setPassword("");
		setErrorMessage([]);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);

		// validate first
		let em = [];
		if (email.trim() === "") em.push("L'email est obligatoire.");
		if (password.trim() === "") em.push("Le mot de passe est obligatoire.");

		if (em.length > 0) {
			setErrorMessage(em);
			return; // stop here if invalid
		}

		const rep = await fetch(svrUrl + "/auth/token", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				email: document.getElementById("email").value,
				password: document.getElementById("password").value,
			}),
		});
		if (rep.ok) {
			const data = await rep.json();
			localStorage.setItem("token", data.token);
			setIsLoggedIn(true);
			navigate("/");
		} else {
			setError("Email ou mot de passe incorrect.");
		}
	}

	return (
		<div className="container">
			<div className="section">
				{errorMessage.length !== 0 && (
					<div className="block">
						<div
							className="notification is-danger"
							tabIndex="0"
							role="alert"
							id="errorDiv"
							ref={errorMessageRef}
						>
							<button
								className="delete"
								tabIndex="-1"
								onClick={() => {
									setErrorMessage([]);
								}}
							></button>
							{errorMessage.map((error) => {
								return (
									<span key={error}>
										{error}
										<br />
									</span>
								);
							})}
						</div>
					</div>
				)}

				<div className="content">
					{error && <p className="has-text-danger">{error}</p>}
					<div className="field">
						<label htmlFor="email" className="label">
							Email
						</label>
						<div className="control has-icons-left">
							<input
								id="email"
								type="email"
								placeholder="e1234567@site.com"
								className="input"
								autoComplete="email"
								aria-required="true"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span className="icon is-small is-left">
								<i className="fa fa-envelope"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<label htmlFor="password" className="label">
							Password
						</label>
						<div className="control has-icons-left">
							<input
								id="password"
								type="password"
								placeholder="*******"
								className="input"
								autoComplete="current-password"
								aria-required="true"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span className="icon is-small is-left">
								<i className="fa fa-lock"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								className="button is-success"
								onClick={handleSubmit}
							>
								Connexion
							</button>
							<button
								className="button is-danger"
								onClick={() => navigate("/")}
							>
								Annuler
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
