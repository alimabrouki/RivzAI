import { Route, Routes } from "react-router";
import { HomePage } from "./pages/Home/HomePage";
import { HistoryPage } from "./pages/History/HistoryPage";
import { ChatPage } from "./pages/History/ChatPage";
import "./styles/index.css";
import TeacherMode from "./pages/teacher-mode/TeacherMode";
import SigninPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ComfirmVerifyEmailPage from "./pages/auth/ComfirmVerifyEmailPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

export const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index path="/history" element={<HistoryPage />} />
        <Route index path="/history/:chatId" element={<ChatPage />} />
        <Route index path="/teacher-mode/" element={<TeacherMode />} />
      </Route>

      <Route index path="/" element={<HomePage />} />

      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/auth/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/auth/verify-email/:token"
        element={<ComfirmVerifyEmailPage />}
      />
    </Routes>
  );
};

export default App;
