import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Account Created");

      navigate("/login");

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
          onSubmit={handleRegister}
        >

          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            {loading
              ? "Loading..."
              : "Register"}
          </button>

          <p>
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </form>

      </section>

      <Footer />
    </>
  );
};

export default Register;