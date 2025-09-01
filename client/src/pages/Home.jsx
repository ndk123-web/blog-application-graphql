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

dayjs.extend(relativeTime);

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
              <button key={idx} onClick={() => navigate(`/post/${val._id}`)}>
                <div className="border-2 border-black p-2 m-2">
                  <h3>{val.title}</h3>
                  <p>{val.subtitle}</p>
                  <p>created: {dayjs(Number(val.createdAt)).fromNow()}</p>
                </div>
              </button>
            ))}
          </>
        )}
      </div>

      <hr />

      <button onClick={() => refetch()}>Refetch GET_ALL_POSTS</button>

      <br />
      <br />

      <button onClick={() => navigate("/create-post")}>Create Post</button>
    </>
  );
};

export default Home;
