import "../../styles/Auth/AuthPage.css";
import { BsGoogle, BsEye, BsEyeSlash } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../../api/registerUser";
import loginUser from "../../api/loginUser";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");

  const [forgotPass, setForgotPass] = useState(false);

  const navigate = useNavigate();

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;
  const isUsernameValid = username.trim().length >= 3;

  const handleAuth = async () => {
    setIsSubmitting(true);

    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!isLoginMode && !isUsernameValid) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!isEmailValid) {
      newErrors.email = "Please enter a valid email";
    }

    if (!isPasswordValid) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setError(newErrors);

    const hasErrors =
      newErrors.username || newErrors.email || newErrors.password;

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!isLoginMode) {
        const result = await registerUser({
          email,
          password,
          username,
        });
        if (result.error) {
          setAuthError(result.error);
          return;
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      } else {
        const result = await loginUser({
          email,
          password,
        });

        if (result.error) {
          setAuthError(result.error);
          return;
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user) || "null");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Auth</title>

      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth();
          }}
        >
          {forgotPass ? (
            <>
              <h1 className="authTitle">Reset your password</h1>
              <p className="authSubtitle">
                Enter your email and we'll send you a reset link.
              </p>

              <label className="authLabel">Email address</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthError("");
                }}
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className="authInput"
              />
              {authError && <p className="authError">{authError}</p>}
              {error.email && <p className="authError">{error.email}</p>}

              <button
                type="submit"
                className={`authButton ${!isEmailValid ? "disabled" : ""}`}
              >
                Send
              </button>
            </>
          ) : (
            <>
              <h1 className="authTitle">
                {isLoginMode ? "Sign in to RivzAI" : "Create your RivzAI account"}
              </h1>

              <p className="authSubtitle">
                Access Teacher Mode, save homework, and manage your account.
              </p>

              <button type="button" className="authButton">
                <BsGoogle size={18} />
                {isLoginMode ? "Continue with Google" : "Sign up with Google"}
              </button>

              <div className="authDivider">
                <span>or</span>
              </div>

              {!isLoginMode && (
                <>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setAuthError("");
                    }}
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    className="authInput"
                  />

                  {error.username && <p className="authError">{error.username}</p>}
                </>
              )}

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthError("");
                }}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="authInput"
              />
              {authError && <p className="authError">{authError}</p>}
              {error.email && <p className="authError">{error.email}</p>}

              <div className="passwordWrapper">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError("");
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
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

              {error.password && <p className="authError">{error.password}</p>}

              <button
                type="submit"
                className={`authButton ${
                  (!isLoginMode && !isUsernameValid) ||
                  !isEmailValid ||
                  !isPasswordValid
                    ? "disabled"
                    : ""
                }`}
              >
                {isSubmitting && !authError
                  ? "Loading..."
                  : isLoginMode
                    ? "Sign In"
                    : "Create Account"}
              </button>
              {isLoginMode && (
                <button
                  type="button"
                  onClick={() => setForgotPass(true)}
                  className="forgot-password"
                >
                  Forgot Password ?
                </button>
              )}
            </>
          )}
          <p className="authSwitchText">
            {forgotPass ? "Remember your password?" : isLoginMode ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            className="authSwitchButton"
            onClick={() => {
              if (forgotPass) {
                setForgotPass(false);
              } else {
                setIsLoginMode(!isLoginMode);
              }
            }}
          >
            {forgotPass ? "Sign In" : isLoginMode ? "Create Account" : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
