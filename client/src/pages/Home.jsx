import {
  ApolloClient,
  gql,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      _id
      title
      subtitle
      createdAt
      text
      updatedAt
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const POST_CREATED_SUBSCRIPTION = gql`
    subscription PostCreated {
      createPost {
        _id
        title
      }
    }
  `;

  const POST_UPDATED_SUBSCRIPTION = gql`
    subscription PostUpdated {
      updatePost {
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

  const { loading, data, error, refetch } = useQuery(GET_ALL_POSTS);
  const [deletePost] = useMutation(DELETE_POST);

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

  useSubscription(POST_DELETED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log("New Post Deleted: ", data.data.deletePost);

      // This is Important whenever this runs then automatically this component render
      // refetch is of GET_ALL_POSTS so all components using this Query will re renders
      refetch();
    },
  });

  if (loading) {
    return (
      <>
        <div className="align-center justify-center">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  const handleDelete = async (postId) => {
    try {
      if (!confirm("Do U Want To Delete ? ")) return;
      await deletePost({ variables: { postId } });
    } catch (err) {
      alert(err.message);
    } finally {
      // after delete refetch All Posts
      // or web socker also listening on when Post Deleted
      refetch();
    }
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold">Home Page</h1>

      <hr className="my-4" />

      <div>
        {data.getAllPosts?.length === 0 ? (
          <div>
            <h3>Currently There is No Posts</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.getAllPosts?.map((val) => (
              <div
                key={val._id}
                onClick={() => navigate(`/post/${val._id}`)}
                className="border-2 border-black p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
              >
                <h3 className="font-semibold text-lg">{val.title}</h3>
                <p className="text-gray-600">{val.subtitle}</p>
                <p className="text-gray-600">{val.text}</p>
                <p className="text-sm text-gray-500">
                  created: {dayjs(Number(val.updatedAt)).fromNow()}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Stop card click
                      navigate(`/post/update/${val._id}`);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Stop card click
                      handleDelete(val._id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />

      <button
        onClick={() => refetch()}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Refetch GET_ALL_POSTS
      </button>

      <br />
      <br />

      <button
        onClick={() => navigate("/create-post")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create Post
      </button>
    </>
  );
};

export default Home;
