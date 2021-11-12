import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "./Link";

const LinkList = () => {
  const linksToRender = [
    {
      id: "1",
      description: "Prisma gives you a powerful database toolkit 😎",
      url: "https://prisma.io",
    },
    {
      id: "2",
      description: "The best GraphQL client",
      url: "https://www.apollographql.com/docs/react/",
    },
  ];

  const FEED_QUERY = gql`
    {
      feed {
        id
        links {
          id
          createdAt
          url
          description
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <p style={{padding: 20, textAlign:"center"}}>Loading...</p>;

  if (error) console.log(error);

  return (
    <div>
      {data &&
        data.feed.links.map((link) => <Link key={link.id} link={link} />)}
    </div>
  );
};

export default LinkList;