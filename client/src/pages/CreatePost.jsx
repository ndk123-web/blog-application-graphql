import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_POSTS } from '../pages/Home'

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

  // important
  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Title", title);
    console.log("Subtitle", subtitle);
    console.log("Content", content);

    try {
      setLoading(true);
      await createPost({
        variables: { title: title, subtitle: subtitle, text: content },
        refetchQueries: { query: GET_ALL_POSTS },
      });
      alert("Post Created Successfully");
    } catch (err) {
      alert("error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="justify-center align-center">CreatePost Page</h1>

      <hr />

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <label>Subtitle</label>
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <br />
        <br />

        <label>Content</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Create Post</button>
      </form>

      <br />
      <br />

      <button onClick={() => navigate('/home') }>
        Home 
      </button>
    </>
  );
};

export default CreatePost;
