import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLongout = () => {
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

  return (
    <>
      <button onClick={() => handleLongout()}>
        LogOut 
      </button>
    </>
  );
};

export default Navbar;