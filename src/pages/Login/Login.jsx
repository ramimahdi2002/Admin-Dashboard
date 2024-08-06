import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
    navigate('../');
  };

  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/assets/1.jpg`} alt="" />
      <div className="login-card">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              /> Remember my preference
            </label>
            <a href="/forgotpass" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Sign me in</button>
        </form>
        <div className="signup-link">
          <span>Don't have an account? <a href="Register">Sign up</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
