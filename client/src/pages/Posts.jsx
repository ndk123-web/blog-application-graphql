import { useParams, useNavigate } from "react-router-dom";
import { useSubscription, useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTheme } from "../context/ThemeContext";

dayjs.extend(relativeTime);

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
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
        author{ name email }
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

  const { data, error, loading, refetch } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
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
          }`}>Loading post...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg max-w-md mx-4`}>
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {error.message}
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.getPostById) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg max-w-md mx-4`}>
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const post = data.getPostById;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/home')}
            className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Post Content */}
        <article className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          {/* Post Header */}
          <div className="p-8">
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h1>
              
              {post.subtitle && (
                <h2 className={`text-xl md:text-2xl mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                } font-medium`}>
                  {post.subtitle}
                </h2>
              )}
              
              {/* Post Meta */}
              <div className={`flex flex-wrap items-center gap-4 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              } border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              } pb-6`}>
                <div className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>Published {dayjs(Number(post.createdAt)).fromNow()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>👤</span>
                  <span>By {data?.getPostById?.author?.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📖</span>
                  <span>{Math.ceil(post.text.length / 200)} min read</span>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className={`prose prose-lg max-w-none ${
              theme === 'dark' 
                ? 'prose-invert prose-headings:text-white prose-p:text-gray-300' 
                : 'prose-gray'
            }`}>
              <div className={`whitespace-pre-wrap leading-relaxed text-base md:text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {post.text}
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className={`px-8 py-6 border-t ${
            theme === 'dark' ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {post.createdAt !== post.updatedAt && (
                  <span>Last updated {dayjs(Number(post.updatedAt || post.createdAt)).fromNow()}</span>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/home')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🏠 All Posts
                </button>
                <button
                  onClick={() => navigate('/create-post')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  ✍️ Write Post
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Actions */}
        <div className="mt-8 text-center">
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enjoying our blog? Share your own stories!
          </p>
          <button
            onClick={() => navigate('/create-post')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Your Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
