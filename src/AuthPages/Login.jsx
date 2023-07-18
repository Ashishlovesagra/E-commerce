import React, { useState } from "react";
import "./Style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../ContextApi/Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerce-backend-chi.vercel.app/api/v1/auth/login",
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="login-form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="username">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              name="username"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div
            className="form-group"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            <button type="button">Forgot Password</button>
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
          <div className="form-group">
            <div className="NewUser">
              New User Register{" "}
              <Link className="link" to="/register">
                Click Here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
