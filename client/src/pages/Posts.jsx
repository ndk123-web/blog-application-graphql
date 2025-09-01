import { useParams } from "react-router-dom";
import { useSubscription, useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Post = () => {
  const { postId } = useParams();
  console.log("PostId: ", postId);

  const POST_UPDATED_SUBSCRIPTION = gql`
    subscription PostUpdated {
      updatePost {
        _id
        title
      }
    }
  `;

    const POST_CREATED_SUBSCRIPTION = gql`
    subscription PostCreated {
      createPost {
        _id
        title
      }
    }
  `;

  const POST_DELETED_SUBSCRIPTION = gql`
    subscription PostDeleted {
      deletePost
    }
  `;

  const GET_POST_BY_ID = gql`
    query GetPostById($postId: ID!) {
      getPostById(postId: $postId) {
        title
        subtitle
        createdAt
        text
      }
    }
  `;

  useSubscription(POST_CREATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log("New Post Created: ", data.data.createPost);

      // This is Important whenever this runs then automatically this component render
      // refetch is of GET_ALL_POSTS so all components using this Query will re renders
      refetch();
    },
  });

  useSubscription(POST_UPDATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log("New Post Updated: ", data.data.editPost);

      // This is Important whenever this runs then automatically this component render
      // refetch is of GET_ALL_POSTS so all components using this Query will re renders
      refetch();
    },
  });

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
        <p>{post.text}</p>
        <p>created: {dayjs(Number(post.createdAt)).fromNow()}</p>
      </div>
    </>
  );
};

export default Post;
