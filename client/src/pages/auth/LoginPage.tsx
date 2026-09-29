import "../../styles/Auth/AuthPage.css";
import logo from "../../assets/images/logo.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signinUser from "../../api/signinUser";
import { useAuth } from "../../hooks/useAuth";
import { useAuthError } from "../../hooks/useAuthError";
import GoogleLoginButton from "./GoogleLoginButton";
import AuthErrorPopup from "./AuthErrorPopup";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, showError, clearError } = useAuthError();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sessionExpired")) {
      sessionStorage.removeItem("sessionExpired");
      setShowSessionExpired(true);
      const timer = setTimeout(() => setShowSessionExpired(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (user) navigate("/");
  });

  const handleSignin = async () => {
    if (!isEmailValid) {
      showError("Please enter a valid email");
      return;
    }
    if (!isPasswordValid) {
      showError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const result = await signinUser({ email, password });

      if (result.error) {
        showError(result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      login(result.user);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      showError("Something went wrong. Please try again.");
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
          className={`authCard ${googleLoading ? "is-loading" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          {googleLoading && (
            <div className="authCardLoadingOverlay" aria-live="polite">
              <Loader2 className="btn-spinner" />
            </div>
          )}

          <AuthErrorPopup message={error} />

          {showSessionExpired && (
            <p className="session-expired-banner">
              Your session has expired. Please log in again.
            </p>
          )}

          <h1 className="authTitle">Sign in to RivzAI</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <GoogleLoginButton onLoadingChange={setGoogleLoading} />

          <div className="authDivider">
            <span>or</span>
          </div>

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
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
                clearError();
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
