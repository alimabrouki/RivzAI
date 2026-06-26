import "../../styles/Auth/AuthPage.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { LuMail } from "react-icons/lu";

const VerifyEmailPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isVerified = user?.is_verified;

  if (isVerified) {
    return (
      <>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <title>Verified</title>
        <div className="authPage">
          <div className="authCard verify-email-card">
            <div className="verify-email-icon verified">
              <LuMail size={48} />
            </div>
            <h1 className="authTitle">You're verified!</h1>
            <p className="authSubtitle">
              Your email has been successfully verified.
            </p>
            <Link to="/" className="authButton verify-email-btn">
              Go to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Verify Email</title>
      <div className="authPage">
        <div className="authCard verify-email-card">
          <div className="verify-email-icon">
            <LuMail size={48} />
          </div>
          <h1 className="authTitle">Verify your email</h1>
          <p className="authSubtitle">
            We sent you a verification email. Please check your inbox and click
            the link to verify your account.
          </p>
          <p className="verify-email-note">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Link to="/" className="authButton verify-email-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
