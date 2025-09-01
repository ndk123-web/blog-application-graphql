import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
      <>
        <div>
          <h2>Redirecting to Home Page...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="justify-center align-center">SignIn Page</h1>

      <hr />

      <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="new-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </>
  );
};

export default SignIn;
