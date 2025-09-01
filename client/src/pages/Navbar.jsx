import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      setLoading(true);
      localStorage.setItem("token", "");
      localStorage.setItem("userData", "");
      localStorage.setItem("isAuth", false);

      navigate("/");
    } catch (err) {
      console.log("err: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Create Post", path: "/create-post" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/home")}
              className={`text-2xl font-bold transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              📝 BlogApp
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-100 text-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* User Info */}
            {userData.name && (
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Welcome, <span className="font-medium">{userData.name}</span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : theme === 'dark'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-100 text-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile User Info & Logout */}
              <div className={`border-t pt-4 mt-4 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {userData.name && (
                  <div className={`px-3 py-2 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Welcome, <span className="font-medium">{userData.name}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  disabled={loading}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    loading
                      ? 'opacity-50 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'text-red-400 hover:bg-gray-700 hover:text-red-300'
                        : 'text-red-600 hover:bg-gray-100 hover:text-red-700'
                  }`}
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;