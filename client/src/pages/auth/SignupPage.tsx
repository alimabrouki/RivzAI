import "../../styles/Auth/AuthPage.css";
import logo from "../../assets/images/logo.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupUser from "../../api/signupUser";
import { useAuth } from "../../hooks/useAuth";
import { useAuthError } from "../../hooks/useAuthError";
import GoogleLoginButton from "./GoogleLoginButton";
import AuthErrorPopup from "./AuthErrorPopup";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, showError, clearError } = useAuthError();
  const { login } = useAuth();
  const navigate = useNavigate();

  const isUsernameValid = username.trim().length >= 3;
  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  const handleSignup = async () => {
    if (!isUsernameValid) {
      showError("Username must be at least 3 characters");
      return;
    }
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
      const result = await signupUser({ email, password, username });

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
      <title>Create Account</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <AuthErrorPopup message={error} />

          <h1 className="authTitle">Create your RivzAI account</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <GoogleLoginButton />

          <div className="authDivider">
            <span>or</span>
          </div>

          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
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

          <button
            type="submit"
            className={`authButton ${
              !isUsernameValid || !isEmailValid || !isPasswordValid
                ? "disabled"
                : ""
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="btn-spinner" />
            ) : (
              "Create Account"
            )}
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
