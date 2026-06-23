import "../../styles/Auth/ResetPasswordPage.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import resetPassword from "../../api/resetPassword";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword;

  const handleReset = async () => {
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!doPasswordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await resetPassword({ token: token!, password });

      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="authPage">
        <div className="authCard">
          <h1 className="authTitle">Password Reset</h1>
          <p className="authSubtitle">
            Your password has been reset successfully.
          </p>
          <Link to="/auth/signin" className="authButton">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Reset Password</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          <h1 className="authTitle">Set new password</h1>
          <p className="authSubtitle">
            Enter your new password below.
          </p>

          <label className="authLabel">New password</label>
          <div className="passwordWrapper">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type={showPassword ? "text" : "password"}
              placeholder="New password"
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

          <label className="authLabel">Confirm password</label>
          <div className="passwordWrapper">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              className="authInput"
            />
            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <BsEyeSlash size={18} />
              ) : (
                <BsEye size={18} />
              )}
            </button>
          </div>

          {error && <p className="authError">{error}</p>}

          <button
            type="submit"
            className={`authButton ${
              !isPasswordValid || !doPasswordsMatch ? "disabled" : ""
            }`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
