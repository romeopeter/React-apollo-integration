import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "./Link";

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
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
      }
    }
  }
`;

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading)
    return <p style={{ padding: 20, textAlign: "center" }}>Loading...</p>;

  if (error) console.log(error);

  return (
    <div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </div>
  );
};

export default LinkList;