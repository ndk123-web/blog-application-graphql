import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Login";
import Post from "./pages/Posts";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/create-post"
            element={
              <>
                <Navbar /> <CreatePost />{" "}
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Navbar /> <Home />{" "}
              </>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <>
                <Navbar /> <Post />{" "}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
