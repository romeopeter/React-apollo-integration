import React from "react";

export default function Link({ link }) {
	return (
		<div style={{marginLeft: 40,padding:5}}>
			<p>
				{link.description} <a href="#">({link.url})</a>
			</p>
		</div>
	);
}