import React from "react";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import timeDifferenceForDate from "../utils";

export default function Link(props) {
	const { link } = props;
	const authToken = localStorage.getItem(AUTH_TOKEN);

	const take = LINKS_PER_PAGE;
	const skip = 0;
	const orderBy = { createdAt: "desc" };

	const VOTE_MUTATION = gql`
		mutation VoteMutation($linkId: ID!) {
			vote(linkId: $linkId) {
				id
				link {
					id
					votes {
						id
						user {
							id
						}
					}
				}
				user {
					id
				}
			}
		}
	`;

	/*
	 Can't find unique ID for logged in user in server code. 
	 Unique ID is tied to token 
	*/
	const [vote, { data, loading, error }] = useMutation(VOTE_MUTATION, {
		variables: {
			linkId: link.id,
		},
		update(cache, { data: { vote } }) {
			const feed = cache.readQuery({ query: FEED_QUERY });

			const updateLinks = feed.links.map((feedLink) => {
				if (feedLink.id === link.id) {
					return {
						...feedLink,
						votes: [feedLink.votes, vote],
					};
				}
			});

			cache.writeQuery({
				query: FEED_QUERY,
				data: { feed: { links: updateLinks } },
			});
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) console.log(error);

	return (
		<div className="flex mt2 items-start">
			<div className="flex items-center">
				<span className="gray">{props.index + 1}.</span>
				{authToken && (
					<div
						className="ml1 gray f11"
						style={{ cursor: "pointer" }}
						onClick={() => vote()}
					>
						▲
					</div>
				)}
			</div>
			<div className="ml1">
				<div>
					{link.description} <a href="#">({link.url})</a>
				</div>
				{authToken && (
					<div className="6 lh-copy gray">
						{link.votes.length} votes |{" "}
						{link.postedBy ? link.postedBy.name : "Unknown"}{" "}
						{timeDifferenceForDate(link.createdAt)}
					</div>
				)}
			</div>
		</div>
	);
}