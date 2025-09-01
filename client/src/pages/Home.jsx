import {
  ApolloClient,
  gql,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const GET_ALL_POSTS = gql`
    query getAllPosts {
      getAllPosts {
        _id
        title
        subtitle
        createdAt
      }
    }
  `;

  const { loading, data, error, refetch } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return (
      <>
        <div className="align-center justify-center">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="justify-center align-center">Home Page</h1>

      <hr />

      <div>
        {data.getAllPosts?.length === 0 ? (
          <>
            <div>
              <h3>Currently There is No Posts</h3>
            </div>
          </>
        ) : (
          <>
            {data.getAllPosts?.map((val, idx) => (
              <div key={val._id}>
                <h3>{val.title}</h3>
                <p>{val.subtitle}</p>
                <p>{val.createdAt}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <hr />

      <button onClick={refetch}>Refetch GET_ALL_POSTS</button>

      <br />
      <br />

      <button onClick={() => navigate("/create-post")}>Create Post</button>
    </>
  );
};

export default Home;
