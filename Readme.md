# 📝 BlogApp - Full Stack GraphQL Blog Application

A modern, full-stack blogging platform built with **React**, **GraphQL**, **Apollo Client**, and **Tailwind CSS**. This project demonstrates hands-on practice with GraphQL queries, mutations, and subscriptions in a real-world application.

![BlogApp Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=BlogApp+Dashboard)

## ✨ Features

### 🚀 Core Functionality
- **Create Posts**: Write and publish blog posts with title, subtitle, and content
- **Edit Posts**: Update your existing posts (only the author can edit)
- **Delete Posts**: Remove posts you've created
- **View Posts**: Browse all posts and read individual post details
- **User Authentication**: Secure signup and login system

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Loading States**: Beautiful loading indicators throughout the app
- **Form Validation**: Real-time validation with helpful error messages

### ⚡ Real-time Features
- **Live Updates**: See new posts, edits, and deletions in real-time
- **GraphQL Subscriptions**: Automatic UI updates when data changes
- **Optimistic Updates**: Instant UI feedback for better user experience

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Apollo Client** - GraphQL client with caching and subscriptions
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **GraphQL** - Query language and runtime
- **Apollo Server** - GraphQL server implementation
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Token authentication

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
blog-graphql/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── apollo/                  # Apollo Client configuration
│   │   │   └── client.js
│   │   ├── assets/                  # Static assets (images, icons)
│   │   ├── components/              # Reusable React components
│   │   ├── context/                 # React Context (Theme)
│   │   │   └── ThemeContext.jsx
│   │   ├── graphql/                 # GraphQL operations
│   │   │   ├── fragments/           # GraphQL fragments
│   │   │   ├── mutations/           # GraphQL mutations
│   │   │   ├── queries/            # GraphQL queries
│   │   │   └── subscriptions/      # GraphQL subscriptions
│   │   ├── pages/                  # Page components
│   │   │   ├── About.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── UpdatePost.jsx
│   │   ├── App.jsx               # Main App component
│   │   └── main.jsx             # Application entry point
│   ├── package.json
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vite.config.js         # Vite configuration
│
├── server/                         # Backend GraphQL server
│   ├── src/
│   │   ├── models/                # Database models
│   │   │   ├── comment.model.js
│   │   │   ├── post.model.js
│   │   │   └── user.model.js
│   │   ├── schema/
│   │   │   ├── resolvers/         # GraphQL resolvers
│   │   │   │   ├── comment.resolver.js
│   │   │   │   ├── index.js
│   │   │   │   ├── post.resolver.js
│   │   │   │   └── user.resolver.js
│   │   │   ├── subscriptions/     # GraphQL subscriptions
│   │   │   │   └── post.subscription.js
│   │   │   └── typedefs/         # GraphQL type definitions
│   │   │       ├── comment.typedef.js
│   │   │       ├── index.js
│   │   │       ├── post.typedef.js
│   │   │       └── user.typedef.js
│   │   ├── utils/
│   │   │   └── db.js            # Database connection
│   │   └── server.mjs          # Server entry point
│   └── package.json
│
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ndk123-web/blog-application-graphql.git
   cd blog-application-graphql
   ```

2. **Setup Backend Server**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend Client**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Database Setup**
   - Create a MongoDB database (local or cloud)
   - Update the database connection string in `server/src/utils/db.js`

2. **Environment Variables**
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string and JWT secret:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blogapp
   JWT_SECRET=your_jwt_secret_key_here
   PORT=4000
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   The GraphQL server will run on `http://localhost:4000`
   Visit `http://localhost:4000/graphql` to access GraphQL Playground

2. **Start the Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   The React app will run on `http://localhost:5173`

## 📊 GraphQL API

### Key Operations

#### Queries
```graphql
# Get all posts
query GetAllPosts {
  getAllPosts {
    _id
    title
    subtitle
    text
    createdAt
    updatedAt
    author {
      name
      email
    }
  }
}

# Get post by ID
query GetPostById($postId: ID!) {
  getPostById(postId: $postId) {
    _id
    title
    subtitle
    text
    createdAt
    updatedAt
  }
}
```

#### Mutations
```graphql
# Create a new post
mutation CreatePost($title: String!, $subtitle: String!, $text: String!) {
  createPost(title: $title, subtitle: $subtitle, text: $text) {
    _id
    title
    subtitle
    text
    createdAt
  }
}

# Update a post
mutation UpdatePost($postId: ID!, $title: String!, $subtitle: String!, $text: String!) {
  editPost(postId: $postId, title: $title, subtitle: $subtitle, text: $text) {
    _id
    title
    subtitle
    text
    updatedAt
  }
}

# Delete a post
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}

# User authentication
mutation SignUp($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  signUp(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
    token
    user {
      name
      email
    }
  }
}

mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      name
      email
    }
  }
}
```

#### Subscriptions
```graphql
# Listen for new posts
subscription PostCreated {
  createPost {
    _id
    title
    author {
      name
    }
  }
}

# Listen for post updates
subscription PostUpdated {
  updatePost {
    _id
    title
  }
}

# Listen for post deletions
subscription PostDeleted {
  deletePost
}
```

## 🎨 UI Components & Features

### Theme System
- **Dark Mode**: Modern dark theme with proper contrast
- **Light Mode**: Clean light theme for comfortable reading
- **Persistent**: Theme preference saved in localStorage
- **Smooth Transitions**: Animated theme switching

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Enhanced**: Rich desktop experience with advanced layouts

### User Experience
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error messages and fallbacks
- **Form Validation**: Real-time validation with helpful feedback
- **Smooth Animations**: CSS transitions and transforms

## 🔧 Development Scripts

### Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server Scripts
```bash
npm start           # Start the server
npm run dev         # Start with nodemon (development)
```

## 📱 Usage Guide

### For Writers
1. **Sign Up**: Create your account with name, email, and password
2. **Login**: Access your dashboard
3. **Create Post**: Click "Create New Post" and fill in the details
4. **Manage Posts**: Edit or delete your own posts from the home page
5. **Read Posts**: Browse and read posts from other writers

### For Readers
1. **Browse Posts**: Visit the home page to see all posts
2. **Read Posts**: Click on any post to read the full content
3. **Discover Authors**: See who wrote each post
4. **Switch Themes**: Toggle between dark and light modes

## 🔐 Authentication & Security

- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **Password Hashing**: Passwords are securely hashed before storage
- **Authorization**: Users can only edit/delete their own posts
- **Client-side Protection**: Routes protected based on authentication status

## 🌟 Learning Outcomes

This project demonstrates proficiency in:

### GraphQL Concepts
- **Queries**: Fetching data efficiently
- **Mutations**: Creating, updating, and deleting data
- **Subscriptions**: Real-time updates and live data
- **Resolvers**: Server-side logic for handling operations
- **Type Definitions**: Defining GraphQL schema

### React Concepts
- **Hooks**: useState, useEffect, useContext, custom hooks
- **Context API**: Global state management (theme)
- **Apollo Client**: GraphQL client with caching
- **React Router**: Client-side routing and navigation
- **Component Architecture**: Reusable and maintainable components

### Modern Web Development
- **Responsive Design**: Mobile-first approach
- **Performance**: Code splitting and optimization
- **User Experience**: Loading states, error handling, smooth interactions
- **Modern CSS**: Tailwind CSS utility-first approach
- **Build Tools**: Vite for fast development and building

## 🔍 GraphQL Implementation Notes

### What I Noticed During Development

1. **WebSocket Connection Lifecycle**: 
   - WS connection is established only when a component with subscriptions mounts
   - This ensures efficient resource usage and connection management

2. **JWT Authorization with WebSockets**:
   - JWT tokens are validated during WebSocket connection establishment
   - Once connected, the WS maintains the authenticated session
   - Subsequent subscription events don't require re-authentication

3. **Real-time Updates Architecture**:
   - Subscriptions automatically trigger UI re-renders
   - Apollo Client cache updates propagate to all relevant components
   - `refetch()` function ensures data consistency across the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Apollo GraphQL** for excellent GraphQL tools and documentation
- **React Team** for the amazing React ecosystem
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the fast build tool

## 📞 Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: [@ndk123-web](https://github.com/ndk123-web)
- **Project Repository**: [blog-application-graphql](https://github.com/ndk123-web/blog-application-graphql)

---

**Happy Blogging! 📝✨** 