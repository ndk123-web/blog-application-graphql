import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      user {
        name
        email
      }
    }
  }
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [signUp] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPassword);

    try {
      setLoading(true);
      const graphql_response = await signUp({
        variables: {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      });

      console.log("signUp response", graphql_response);

      localStorage.setItem("token", graphql_response.data.signUp.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: graphql_response.data.signUp.user.name,
          email: graphql_response.data.signUp.user.email,
        })
      );
      localStorage.setItem("isAuth", true);

      alert("SignUp Successfully");
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
          }`}>Creating your account...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300 py-12`}>
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            🎆 Join BlogApp
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Create your account to start writing
          </p>
        </div>

        {/* SignUp Form */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

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
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${password && confirmPassword && password !== confirmPassword ? 'border-red-500' : ''}`}
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name || !email || !password || !confirmPassword || password !== confirmPassword}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                !name || !email || !password || !confirmPassword || password !== confirmPassword
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg'
              }`}
            >
              🎉 Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className={`px-8 py-6 border-t ${
            theme === 'dark' ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
          } text-center`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Already have an account?{' '}
              <button
                onClick={() => navigate("/")}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            By signing up, you agree to our terms and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
