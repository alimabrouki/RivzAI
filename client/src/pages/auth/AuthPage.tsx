import "../../styles/Auth/AuthPage.css";
import { BsGoogle } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;
  const isUsernameValid = username.trim().length >= 3;

  const handleAuth = () => {
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

    console.log({
      username,
      email,
      password,
      mode: isLoginMode ? "login" : "register",
    });

    setIsSubmitting(false);
  };

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Auth</title>

      <div className="authPage">
        <div className="authCard">
          <h1 className="authTitle">
            {isLoginMode ? "Sign in to RivzAI" : "Create your RivzAI account"}
          </h1>

          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <button className="authButton">
            <BsGoogle size={18} />
            {isLoginMode ? "Continue with Google" : "Register with Google"}
          </button>

          <div className="authDivider">
            <span>or</span>
          </div>

          {!isLoginMode && (
            <>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="authInput"
              />

              {error.username && <p className="authError">{error.username}</p>}
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="authInput"
          />

          {error.email && <p className="authError">{error.email}</p>}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="authInput"
          />

          {error.password && <p className="authError">{error.password}</p>}

          <button
            onClick={handleAuth}
            className={`authButton ${
              (!isLoginMode && !isUsernameValid) ||
              !isEmailValid ||
              !isPasswordValid
                ? "disabled"
                : ""
            }`}
          >
            {isSubmitting
              ? "Loading..."
              : isLoginMode
                ? "Sign In"
                : "Create Account"}
          </button>

          <p className="authSwitchText">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            className="authSwitchButton"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
