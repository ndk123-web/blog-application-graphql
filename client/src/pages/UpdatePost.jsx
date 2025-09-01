import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GET_ALL_POSTS } from '../pages/Home'

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

  const [updatePost] = useMutation(UPDATE_POST);

  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();

  // important
  const { data, error, loading } = useQuery(GET_POST_BY_POSTID, {
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

    try {
      await updatePost({
        variables: { postId, title, subtitle, text: content },
        refetchQueries: [
        //   { query: GET_POST_BY_POSTID, variables: { postId } }, // single post refresh
          { query: GET_ALL_POSTS }, // list refresh
        ],
      });

      alert("Post Updated Successfully");
      navigate(`/home`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };    

  return (
    <>
      <h1 className="justify-center align-center">UpdatePost Page</h1>

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

        <button type="submit">Update Post</button>
      </form>

      <br />
      <br />

      <button onClick={() => navigate("/home")}>Home</button>
    </>
  );
};

export default UpdatePost;
