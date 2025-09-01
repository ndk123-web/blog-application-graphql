import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const About = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        } transition-colors duration-300`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        About BlogApp 📖
                    </h1>
                    <p className={`text-xl leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        A modern, GraphQL-powered blogging platform built with React and passion
                    </p>
                </div>

                {/* Main Content */}
                <div className={`rounded-xl shadow-lg overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border mb-8`}>
                    <div className="p-8 space-y-8">
                        {/* What is BlogApp */}
                        <section>
                            <h2 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                🚀 What is BlogApp?
                            </h2>
                            <p className={`text-lg leading-relaxed ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                BlogApp is a full-stack blogging platform designed for writers, readers, and developers. 
                                It provides a clean, modern interface for creating, sharing, and managing blog posts with 
                                real-time updates and a seamless user experience.
                            </p>
                        </section>

                        {/* Features */}
                        <section>
                            <h2 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                ✨ Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-4 rounded-lg ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <h3 className={`font-semibold mb-2 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>📝 Create & Edit Posts</h3>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Write and edit your blog posts with an intuitive interface</p>
                                </div>
                                <div className={`p-4 rounded-lg ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <h3 className={`font-semibold mb-2 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>🔄 Real-time Updates</h3>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>See changes instantly with GraphQL subscriptions</p>
                                </div>
                                <div className={`p-4 rounded-lg ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <h3 className={`font-semibold mb-2 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>🌙 Dark/Light Mode</h3>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Toggle between dark and light themes for comfortable reading</p>
                                </div>
                                <div className={`p-4 rounded-lg ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <h3 className={`font-semibold mb-2 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>📱 Responsive Design</h3>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>Optimized for all devices - desktop, tablet, and mobile</p>
                                </div>
                            </div>
                        </section>

                        {/* Technology Stack */}
                        <section>
                            <h2 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                🛠️ Technology Stack
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { name: 'React', icon: '⚛️' },
                                    { name: 'GraphQL', icon: '🔗' },
                                    { name: 'Apollo Client', icon: '🚀' },
                                    { name: 'Tailwind CSS', icon: '🎨' },
                                    { name: 'Node.js', icon: '🟢' },
                                    { name: 'MongoDB', icon: '🍃' },
                                    { name: 'Vite', icon: '⚡' },
                                    { name: 'JWT Auth', icon: '🔐' }
                                ].map((tech) => (
                                    <div key={tech.name} className={`p-3 rounded-lg text-center ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                        <div className="text-2xl mb-1">{tech.icon}</div>
                                        <div className={`text-sm font-medium ${
                                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>{tech.name}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Purpose */}
                        <section>
                            <h2 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                🎯 Purpose
                            </h2>
                            <p className={`text-lg leading-relaxed ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                This project was created as a hands-on practice with GraphQL, showcasing its powerful 
                                capabilities including queries, mutations, and subscriptions. It demonstrates modern 
                                web development practices with a focus on real-time functionality and excellent user experience.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className={`inline-flex flex-col sm:flex-row gap-4 p-6 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } border shadow-lg`}>
                        <button
                            onClick={() => navigate('/create-post')}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            ✍️ Start Writing
                        </button>
                        <button
                            onClick={() => navigate('/home')}
                            className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                                theme === 'dark' 
                                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            🏠 Browse Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;