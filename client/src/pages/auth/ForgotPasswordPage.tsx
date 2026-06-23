import "../../styles/Auth/AuthPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import forgotPassword from "../../api/forgotPassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const isEmailValid = email.includes("@");

  const handleForgotPass = async () => {
    if (!isEmailValid) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await forgotPassword({ email });

      if (result.error) {
        setError(result.error);
        return;
      }

      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="authPage">
        <div className="authCard">
          <h1 className="authTitle">Check your email</h1>
          <p className="authSubtitle">
            If an account with that email exists, we've sent a reset link.
          </p>
          <Link to="/auth/signin" className="authButton">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Forgot Password</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPass();
          }}
        >
          <h1 className="authTitle">Reset your password</h1>
          <p className="authSubtitle">
            Enter your email and we'll send you a reset link.
          </p>

          <label className="authLabel">Email address</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className="authInput"
          />

          {error && <p className="authError">{error}</p>}

          <button
            type="submit"
            className={`authButton ${!isEmailValid ? "disabled" : ""}`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          <p className="authSwitchText">Remember your password?</p>
          <Link to="/auth/signin" className="authSwitchButton">
            Sign In
          </Link>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
