import "../../styles/Auth/AuthPage.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import resetPassword from "../../api/resetPassword";
import { useAuthError } from "../../hooks/useAuthError";
import AuthErrorPopup from "./AuthErrorPopup";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, showError, clearError } = useAuthError();
  const [success, setSuccess] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const doPasswordsMatch = newPassword === confirmPassword;

  const handleReset = async () => {
    if (!isPasswordValid) {
      showError("Password must be at least 8 characters");
      return;
    }
    if (!doPasswordsMatch) {
      showError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const result = await resetPassword({ token: token!, newPassword });
      if (result.error) {
        showError(result.error);
        return;
      }

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      showError("Something went wrong. Please try again.");
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
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Reset Password</title>
      <div className="authPage">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          <AuthErrorPopup message={error} />

          <h1 className="authTitle">Set new password</h1>
          <p className="authSubtitle">Enter your new password below.</p>

          <label className="authLabel">New password</label>
          <div className="passwordWrapper">
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                clearError();
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
                clearError();
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

          <button
            type="submit"
            className={`authButton ${
              !isPasswordValid || !doPasswordsMatch ? "disabled" : ""
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="btn-spinner" />
            ) : (
              "Reset Password"
            )}
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
