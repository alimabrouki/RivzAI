import { AlertTriangle } from "lucide-react";

type AuthErrorPopupProps = {
  message: string;
};

const AuthErrorPopup = ({ message }: AuthErrorPopupProps) => {
  if (!message) return null;

  return (
    <div
      className="error-popup authErrorPopup"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle size={16} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default AuthErrorPopup;
