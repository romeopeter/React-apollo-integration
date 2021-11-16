import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

export default function CreateLink() {
	const [formState, setFormState] = useState({ description: "", url: "" });

	const history = useHistory()

	const CREATE_LINK_MUTATION = gql`
		mutation PostMutation($url: String!, $description: String!) {
			post(url: $url, description: $description) {
				id
				createdAt
				url
				description
			}
		}
	`;

	const [createLink] = useMutation(CREATE_LINK_MUTATION, {
		variables: {
			description: formState.description,
			url: formState.url,
		},
		onCompleted: () => history.push("/")
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createLink();
				}}
			>
				<div className="flex flex-column mt3">
					<input
						type="text"
						className="mt2"
						type="text"
						placeholder="A description for the link"
						onChange={(e) =>
							setFormState({
								...formState,
								description: e.target.value,
							})
						}
						value={formState.description}
					/>
					<input
						className="mb2"
						value={formState.url}
						onChange={(e) =>
							setFormState({
								...formState,
								url: e.target.value,
							})
						}
						type="text"
						placeholder="The URL for the link"
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}