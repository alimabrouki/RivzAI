import "../../styles/Auth/AuthPage.css";
import { BsGoogle } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;

  const handleRegister = () => {
    console.log(email, password);
    const newErrors = {
      email: "",
      password: "",
    };
    if (!isEmailValid) {
      newErrors.email = "Please enter a valid email";
    }
    if (!isPasswordValid) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setError(newErrors);
  };

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Auth</title>
      <div className="authPage">
        <div className="authCard">
          <h1 className="authTitle">Sign in to RivzAI</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <button className="authButton">
            <BsGoogle size={18} /> Continue with Google
          </button>

          <div className="authDivider">
            <span>or</span>
          </div>

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
            onClick={handleRegister}
            className={`authButton ${!isEmailValid || !isPasswordValid ? "disabled" : ""}`}
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
