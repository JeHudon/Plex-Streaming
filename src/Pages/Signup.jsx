import { svrUrl } from "../constants.js";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext.js";

export function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState([]);
	const errorMessageRef = useRef();

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
		setConfirmPassword("");
		setErrorMessage([]);
	}

	async function isPwned(password) {
		const encoder = new TextEncoder();
		const data = encoder.encode(password);
		const hashBuffer = await crypto.subtle.digest("SHA-1", data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hash = hashArray
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("")
			.toUpperCase();

		const firstfive = hash.slice(0, 5);
		const key = "9bc96211-6977-4970-a3de-c913ec9d17f7";

		const rep = await fetch(
			`https://pwnedpasswords.herokuapp.com/api/v1/range?firstfive=${firstfive}&key=${key}`,
		);
		const results = await rep.json();

		return results.some((entry) => entry.sha1 === hash);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		// validate first
		let em = [];

		if (email.trim() === "") {
			em.push("Le courriel est obligatoire.");
		} else {
			if (!email.includes("@"))
				em.push("Le courriel doit contenir le symbole @.");
			if (email.length < 5 || email.length > 50)
				em.push("Le courriel doit contenir entre 5 et 50 caractères.");
		}

		if (password.trim() === "") {
			em.push("Le mot de passe est obligatoire.");
		} else {
			if (!/[!@#$%&*]/.test(password))
				em.push(
					"Le mot de passe doit contenir un des caractères suivants: !@#$%&*",
				);
			if (password.length < 8 || password.length > 30)
				em.push(
					"Le mot de passe doit contenir entre 8 et 30 caractères.",
				);
			if (await isPwned(password))
				em.push(
					"Le mot de passe est compromis. Veuillez en choisir un autre.",
				);
		}

		if (confirmPassword.trim() === "")
			em.push("La confirmation du mot de passe est obligatoire.");
		if (password !== confirmPassword)
			em.push("Les mots de passe ne correspondent pas.");

		if (em.length > 0) {
			setErrorMessage(em);
			return;
		}

		const signup = await fetch(svrUrl + "/auth/register/", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await signup.json();

		if (!signup.ok) {
			em.push(
				data.message ||
					"Erreur lors de l'inscription. Veuillez réessayer.",
			);
			setErrorMessage(em);
			return;
		}

		const login = await fetch(svrUrl + "/auth/token", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				email: document.getElementById("email").value,
				password: document.getElementById("password").value,
			}),
		});
		if (login.ok) {
			const data = await login.json();
			localStorage.setItem("token", data.token);
			setIsLoggedIn(true);
			navigate("/");
		} else {
			em.push("Erreur lors de la connexion. Veuillez réessayer.");
			setErrorMessage(em);
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
						<label htmlFor="confirmPassword" className="label">
							Confirmer le mot de passe
						</label>
						<div className="control has-icons-left">
							<input
								id="confirmPassword"
								type="password"
								placeholder="*******"
								className="input"
								autoComplete="current-password"
								aria-required="true"
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
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
								Inscription
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

export default Signup;
