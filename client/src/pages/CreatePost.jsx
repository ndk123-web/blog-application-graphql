import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_POSTS } from '../pages/Home';
import { useTheme } from "../context/ThemeContext";

const CREATE_POST = gql`
  mutation createUser($title: String!, $subtitle: String!, $text: String!) {
    createPost(title: $title, subtitle: $subtitle, text: $text) {
      title
      subtitle
      createdAt
      text
    } 
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // important
  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Title", title);
    console.log("Subtitle", subtitle);
    console.log("Content", content);

    try {
      setLoading(true);
      await createPost({
        variables: { title: title.trim(), subtitle: subtitle.trim(), text: content.trim() },
        refetchQueries: { query: GET_ALL_POSTS },
      });
      alert("Post Created Successfully");
      navigate("/home");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
            ✍️ Create New Post
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Share your thoughts with the world
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
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Publishing...</span>
                  </span>
                ) : (
                  '🚀 Publish Post'
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

        {/* Tips Section */}
        <div className={`mt-8 p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        } border`}>
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            💡 Writing Tips
          </h3>
          <ul className={`text-sm space-y-1 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <li>• Write a compelling title that grabs attention</li>
            <li>• Use a subtitle to provide more context</li>
            <li>• Break your content into paragraphs for better readability</li>
            <li>• Be authentic and share your unique perspective</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
