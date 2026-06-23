import "../../styles/Auth/AuthPage.css";
import { BsGoogle, BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signinUser from "../../api/signinUser";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  const handleSignin = async () => {
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
      const result = await signinUser({ email, password });

      if (result.error) {
        setError(result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user) || "null");
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <title>Sign In</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          <h1 className="authTitle">Sign in to RivzAI</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <button type="button" className="authButton">
            <BsGoogle size={18} />
            Continue with Google
          </button>

          <div className="authDivider">
            <span>or</span>
          </div>

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
              autoComplete="current-password"
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
              !isEmailValid || !isPasswordValid ? "disabled" : ""
            }`}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </button>

          <Link to="/auth/forgot-password" className="forgot-password">
            Forgot Password ?
          </Link>

          <p className="authSwitchText">Don't have an account?</p>
          <Link to="/auth/signup" className="authSwitchButton">
            Create Account
          </Link>
        </form>
      </div>
    </>
  );
};

export default SigninPage;
