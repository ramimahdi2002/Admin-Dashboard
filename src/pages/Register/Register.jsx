import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ username, email, password, image });

    navigate("/Dashboard");
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign up your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="hello@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Profile Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Profile Preview" />
            </div>
          )}
          <button type="submit" className="register-button">
            Sign me up
          </button>
        </form>
        <div className="login-link">
          <span>
            Already have an account? <a href="/login">Sign in</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
