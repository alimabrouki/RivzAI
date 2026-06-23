import "../../styles/Auth/AuthPage.css";
import { BsGoogle, BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupUser from "../../api/signupUser";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isUsernameValid = username.trim().length >= 3;
  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  const handleSignup = async () => {
    if (!isUsernameValid) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (!isEmailValid) {
      setError("Please enter a valid email");
      return;
    }
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await signupUser({ email, password, username });

      if (result.error) {
        setError(result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <title>Create Account</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <h1 className="authTitle">Create your RivzAI account</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <button type="button" className="authButton">
            <BsGoogle size={18} />
            Sign up with Google
          </button>

          <div className="authDivider">
            <span>or</span>
          </div>

          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            type="text"
            placeholder="Username"
            autoComplete="username"
            className="authInput"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className="authInput"
          />

          <div className="passwordWrapper">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              className="authInput"
            />
            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
            </button>
          </div>

          {error && <p className="authError">{error}</p>}

          <button
            type="submit"
            className={`authButton ${
              !isUsernameValid || !isEmailValid || !isPasswordValid
                ? "disabled"
                : ""
            }`}
          >
            {isSubmitting ? "Loading..." : "Create Account"}
          </button>

          <p className="authSwitchText">Already have an account?</p>
          <Link to="/auth/signin" className="authSwitchButton">
            Sign In
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
