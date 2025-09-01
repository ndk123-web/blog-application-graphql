import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Posts';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import SignUp from './pages/SignUp';
import SignIn from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
