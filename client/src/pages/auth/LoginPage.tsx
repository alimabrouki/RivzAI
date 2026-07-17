import "../../styles/Auth/AuthPage.css";
import logo from "../../assets/images/logo.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signinUser from "../../api/signinUser";
import { useAuth } from "../../hooks/useAuth";
import GoogleLoginButton from "./GoogleLoginButton";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  useEffect(() => {
    if (user) navigate("/");
  });

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
      login(result.user);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
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

          <GoogleLoginButton />

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
            {isSubmitting ? <Loader2 className="btn-spinner" /> : "Sign In"}
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
