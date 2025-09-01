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
import { useTheme } from "../context/ThemeContext";

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
      author{
        email
      }
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
            theme === 'dark' ? 'border-white' : 'border-gray-900'
          }`}></div>
          <h1 className={`mt-4 text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Loading...</h1>
        </div>
      </div>
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
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to BlogApp
          </h1>
          <p className={`text-lg md:text-xl ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } mb-8`}>
            Share your thoughts, discover amazing stories, and connect with fellow writers
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/create-post")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ✍️ Create New Post
            </button>
            <button
              onClick={() => refetch()}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border shadow-md hover:shadow-lg`}
            >
              🔄 Refresh Posts
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Latest Posts ({data.getAllPosts?.length || 0})
          </h2>
          
          {data.getAllPosts?.length === 0 ? (
            <div className={`text-center py-16 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-sm border ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="text-6xl mb-4">📝</div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                No Posts Yet
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              } mb-6`}>
                Be the first to share your thoughts with the community!
              </p>
              <button
                onClick={() => navigate("/create-post")}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Create First Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.getAllPosts?.map((post) => (
                <div
                  key={post._id}
                  onClick={() => navigate(`/post/${post._id}`)}
                  className={`group cursor-pointer rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  } border overflow-hidden`}
                >
                  {/* Post Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {post.title}
                        </h3>
                        <p className={`text-sm mb-3 line-clamp-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {post.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Post Content Preview */}
                    <p className={`text-sm mb-4 line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {post.text}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-xs">
                      <div className={`flex items-center space-x-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>👤 {post.author?.email}</span>
                      </div>
                      <span className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {dayjs(Number(post.updatedAt)).fromNow()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {JSON.parse(localStorage.getItem("userData"))?.email === post.author?.email && (
                    <div className={`px-6 py-4 border-t ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-850' : 'border-gray-100 bg-gray-50'
                    } flex gap-2`}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/post/update/${post._id}`);
                        }}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-1"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post._id);
                        }}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-1"
                      >
                        <span>🗑️</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
