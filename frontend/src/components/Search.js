import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Link from "./Link";

export default function Search() {
	const [searchFilter, setSearchFilter] = useState("");

	const SEARCH_QUERY = gql`
		query searchQuery($filter: String!) {
			feed(filter: $filter) {
				id
				links {
					id
					url
					description
					url
					postedBy {
						id
						name
					}
					votes {
						id
						user {
							id
						}
					}
					createdAt
				}
			}
		}
	`;

	/*
		Error: "Variable '$filter' of required type 'String!' was not provided.
	*/
	const [executeSearch, {called, loading, data }] = useLazyQuery(SEARCH_QUERY, {
		variales: {
			filter: searchFilter,
		},
	});

	return (
		<>
			<div>
				<div>
					Search
					<input
						type="text"
						onChange={(e) => setSearchFilter(e.target.value)}
					/>
					<button onClick={() => executeSearch()}>OK</button>
				</div>
				{data &&
					data.feed.links.map((link, index) => (
						<Link key={link.id} link={link} index={index} />
					))}
			</div>
		</>
	);
}