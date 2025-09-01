import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GET_ALL_POSTS } from '../pages/Home';
import { useTheme } from "../context/ThemeContext";

const GET_POST_BY_POSTID = gql`
  query getPostById($postId: ID!) {
    getPostById(postId: $postId) {
      title
      subtitle
      createdAt
      text
    }
  }
`;

const UPDATE_POST = gql`
  mutation EditPost(
    $postId: ID!
    $title: String!
    $subtitle: String!
    $text: String!
  ) {
    editPost(postId: $postId, title: $title, subtitle: $subtitle, text: $text) {
      title
      subtitle
      createdAt
      text
    }
  }
`;

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [updatePost] = useMutation(UPDATE_POST);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { theme } = useTheme();

  // important
  const { data, error, loading: queryLoading } = useQuery(GET_POST_BY_POSTID, {
    variables: { postId },
  });

  useEffect(() => {
    if (data?.getPostById) {
      setTitle(data.getPostById.title || "");
      setSubtitle(data.getPostById.subtitle || "");
      setContent(data.getPostById.text || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await updatePost({
        variables: { postId, title: title.trim(), subtitle: subtitle.trim(), text: content.trim() },
        refetchQueries: [
        //   { query: GET_POST_BY_POSTID, variables: { postId } }, // single post refresh
          { query: GET_ALL_POSTS }, // list refresh
        ],
      });

      alert("Post Updated Successfully");
      navigate(`/home`);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };    

  // Show loading while fetching post data
  if (queryLoading || !data) {
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

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ✏️ Edit Post
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Update your post content
          </p>
        </div>

        {/* Form Container */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Title *
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title for your post..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
                maxLength={100}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {title.length}/100 characters
              </p>
            </div>

            {/* Subtitle Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Subtitle *
              </label>
              <input
                type="text"
                placeholder="Add a compelling subtitle..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
                maxLength={150}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {subtitle.length}/150 characters
              </p>
            </div>

            {/* Content Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Content *
              </label>
              <textarea
                placeholder="Write your post content here... Share your thoughts, experiences, or stories."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
                minLength={10}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {content.length} characters (minimum 10)
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={loading || !title.trim() || !subtitle.trim() || !content.trim() || content.length < 10}
                className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                  loading || !title.trim() || !subtitle.trim() || !content.trim() || content.length < 10
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </span>
                ) : (
                  '💾 Update Post'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/home')}
                disabled={loading}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className={`mt-8 p-6 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            🔍 Preview
          </h3>
          <div className={`text-sm space-y-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p><strong>Title:</strong> {title || 'Enter a title...'}</p>
            <p><strong>Subtitle:</strong> {subtitle || 'Enter a subtitle...'}</p>
            <p><strong>Content:</strong> {content.substring(0, 100)}{content.length > 100 ? '...' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
