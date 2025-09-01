import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Post = () => {
  const { postId } = useParams();
  console.log("PostId: ", postId);

  const GET_POST_BY_ID = gql`
    query GetPostById($postId: ID!) {
      getPostById(postId: $postId) {
        title
        subtitle
        createdAt
      }
    }
  `;

  const { data, error, loading } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
  });

  if (loading) {
    return (
      <div className="align-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!data || !data.getPostById) {
    return <h1>No Data Found</h1>;
  }

  const post = data.getPostById;

  return (
    <>
      <h1>Post Page</h1>
      <hr />
      <div>
        <h2>{post.title}</h2>
        <p>{post.subtitle}</p>
        <p>created: {dayjs(Number(post.createdAt)).fromNow()}</p>
      </div>
    </>
  );
};

export default Post;
