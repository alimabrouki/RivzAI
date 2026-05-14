import '../../styles/Auth/AuthPage.css';
import { BsGoogle } from "react-icons/bs";
import logo from "../../assets/images/logo.png"
import { useState } from 'react';
const AuthPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

          <div className="authDivider"><span>or</span></div>

          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="authInput" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="authInput" />

          <button className="authButton">Sign in</button>

          <p className="authNote">
            This project is currently frontend-only. Authentication will be added later.
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;