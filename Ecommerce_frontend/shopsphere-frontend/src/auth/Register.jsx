import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../css/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const navigate = useNavigate();

  /* EMAIL VALIDATION */
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  /* PASSWORD VALIDATION */
  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character"
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  /* CONFIRM PASSWORD */
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmError("Passwords do not match");
      return false;
    }
    setConfirmError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) return;

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "USER",
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
  console.error(error.response);
  alert(error.response?.data || "Registration failed");
}

  };

  return (
    <div className="auth-page">
      <form className="auth-card auth-card-register" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join ShopSphere today</p>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {emailError && <span className="auth-error">{emailError}</span>}

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {passwordError && <span className="auth-error">{passwordError}</span>}

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          required
        />
        {confirmError && <span className="auth-error">{confirmError}</span>}

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
