import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/auth.css";
import { projectContext } from "../context/ProjectContext";

const Auth = () => {
  const { setUserId } = useContext(projectContext);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (signup) {
      setFormState({ ...formState, [name]: value });
    } else {
      setLoginState({ ...loginState, [name]: value });
    }
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formState.name ||
      !formState.email ||
      !formState.password ||
      !formState.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formState.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: formState.name,
        password: formState.password,
        email: formState.email,
      });

      const user = response.data;
      console.log(user);
      setSignup(false);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError("Error: Unable to register.");
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginState.email || !loginState.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: loginState.email,
        password: loginState.password,
      });
      const user = response.data;

      setUserId(user.id);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/projects");

      console.log("User logged in:", response.data);
    } catch (error) {
      setError("Error: Unable to log in.");
      console.error(error);
    }
  };

  return (
    <div className="form-container-login">
      <h3>{signup ? "Student Registration" : "Student Login"}</h3>
      {signup ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formState.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formState.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleInputChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span
              className="toggle-link"
              onClick={() => {
                setSignup(false);
                setError("");
              }}
            >
              Login here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginState.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginState.password}
            onChange={handleInputChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span
              className="toggle-link"
              onClick={() => {
                setSignup(true);
                setError("");
              }}
            >
              Register here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
