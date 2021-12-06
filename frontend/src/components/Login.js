import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

export default function Login() {
	let navigate = useNavigate();

	const [formState, setFormState] = useState({
		login: true,
		email: "",
		password: "",
		name: "",
	});

	const SIGNUP_MUTATION = gql`
		mutation SignupMutation(
			$email: String!
			$password: String!
			$name: String!
		) {
			signup(email: $email, password: $password, name: $name) {
				token
				user {
					name
					email
				}
			}
		}
	`;

	let [signup, { signupData, signupLoading, error: signupError }] = useMutation(
		SIGNUP_MUTATION,
		{
			variables: {
				email: formState.email,
				password: formState.password,
				name: formState.password,
			},
			onCompleted: ({ signup }) => {
				localStorage.setItem(AUTH_TOKEN, signup.token);
				navigate("/create");
			},
		}
	);

	const LOGIN_MUTATION = gql`
		mutation LoginMutation($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				token
			}
		}
	`;

	let [login, { loginData, loginLoading, error:loginError }] = useMutation(
		LOGIN_MUTATION,
		{
			variables: {
				email: formState.email,
				password: formState.password,
			},
			onCompleted: ({ login }) => {
				localStorage.setItem(AUTH_TOKEN, login.token);
				navigate("/");
			},
		}
	);

	if (signupError) return <p>Submition error: {signupError.message}</p>;
	if (loginError) return <p>Login error: {loginError.message}</p>;

	return (
		<div>
			<h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="flex flex-column">
					{!formState.login && (
						<input
							value={formState.name}
							onChange={(e) =>
								setFormState({
									...formState,
									name: e.target.value,
								})
							}
							type="text"
							placeholder="Your name"
						/>
					)}
					<input
						value={formState.email}
						onChange={(e) =>
							setFormState({
								...formState,
								email: e.target.value,
							})
						}
						type="text"
						placeholder="Your email address"
					/>
					<input
						value={formState.password}
						onChange={(e) =>
							setFormState({
								...formState,
								password: e.target.value,
							})
						}
						type="password"
						placeholder="Choose a safe password"
					/>
				</div>
				<div className="flex mt3">
					<button
						type="submit"
						className="pointer mr2 button"
						onClick={() => {
							formState.login ? login() : signup()
						}}
					>
						{formState.login ? "login" : "create account"}
					</button>
					<button
						className="pointer button"
						onClick={(e) =>
							setFormState({
								...formState,
								login: !formState.login,
							})
						}
					>
						{formState.login
							? "Need to create an account?"
							: "Already have an account?"}
					</button>
				</div>
			</form>
		</div>
	);
}