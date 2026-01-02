import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";
import AuthHeader from "./AuthHeader";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    onLogin(res.data);
    navigate("/"); // 👉 redirect
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <AuthHeader/>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit-btn">Login</button>

          <p style={{ marginTop: "10px" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#4a6cf7", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
