import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login Successful");

      navigate("/profile");

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Navbar />

      <section className="auth-page">

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <h1>Login</h1>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            {loading ? "Loading..." : "Login"}
          </button>

          <p>
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>

      </section>

      <Footer />
    </>
  );
};

export default Login;