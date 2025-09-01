import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SIGNIN = gql`
  mutation SignIn(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        name
        email
      }
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [SignIn] = useMutation(SIGNIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email", email);
    console.log("Password", password);

    try {
      setLoading(true);
      const graphql_response = await SignIn({
        variables: {
          email: email,
          password: password,
        },
      });

      console.log("SignIn response", graphql_response);

      localStorage.setItem("token", graphql_response.data.login.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: graphql_response.data.login.user.name,
          email: graphql_response.data.login.user.email,
        })
      );
      localStorage.setItem("isAuth", true);

      alert("SignIn Successfully");
      navigate("/home");
    } catch (err) {
      alert("error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
            theme === 'dark' ? 'border-white' : 'border-gray-900'
          }`}></div>
          <h2 className={`mt-4 text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Signing you in...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            📝 Welcome Back
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sign in to your BlogApp account
          </p>
        </div>

        {/* Login Form */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!email || !password}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                !email || !password
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
              }`}
            >
              🚀 Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className={`px-8 py-6 border-t ${
            theme === 'dark' ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
          } text-center`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Don't have an account?{' '}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Join our community of writers and readers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
