import '../../styles/Auth/AuthPage.css';
import { BsGoogle } from "react-icons/bs";

const AuthPage = () => {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>Auth</title>
      <div className="authPage">
        <div className="authCard">
          <h1 className="authTitle">Sign in to RivzAI</h1>
          <p className="authSubtitle">
            Access Teacher Mode, save homework, and manage your account.
          </p>

          <button className="authButton disabled">
            <BsGoogle size={18} /> Continue with Google
          </button>

          <div className="authDivider"><span>or</span></div>

          <input type="email" placeholder="Email address" disabled className="authInput" />
          <input type="password" placeholder="Password" disabled className="authInput" />

          <button className="authButton disabled">Sign in</button>

          <p className="authNote">
            This project is currently frontend-only. Authentication will be added later.
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;