import React, { useState } from "react";
import "../styles/LoginPage.css"; // Ensure CSS is properly linked
import googleIcon from "../../assets/icons/google.png"; // Path to your icons
import twitterIcon from "../../assets/icons/twitter.png";
import Avatar from "../../assets/icons/Avatar.png";
import { authenticate } from "../../services/auth"; // Ensure this function works properly
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (authenticate(username, password)) {
      console.log("Authentication Successful");
      navigate("/home"); // Redirect to home page upon successful login
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
    // Implement Google login logic here later
  };

  const handleTwitterLogin = () => {
    console.log("Login with Twitter");
    // Implement Twitter login logic here later
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">DeskBot</h1>
        <div className="login-avatar">
          <img src={Avatar} alt="Avatar" />
        </div>
        <div className="login-input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="social-login-container">
          <button className="social-login-button" onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="Google" /> Sign in with Google
          </button>
          <button className="social-login-button" onClick={handleTwitterLogin}>
            <img src={twitterIcon} alt="Twitter" /> Sign in with Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
