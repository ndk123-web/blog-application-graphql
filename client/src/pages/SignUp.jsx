import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
      <>
        <div>
          <h2>Signing Up...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="justify-center align-center">SignUp Page</h1>

      <hr />

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          autoComplete="new-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

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

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          autoComplete="new-cf-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
