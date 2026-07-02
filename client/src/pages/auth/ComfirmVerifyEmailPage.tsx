import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import confirmVerifyEmail from "../../api/confirmVerifyEmail";
import { useAuth } from "../../hooks/useAuth";

const ComfirmVerifyEmailPage = () => {
  const { token } = useParams();
  const { updateUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function verify() {
      if (!token) return;

      const result = await confirmVerifyEmail(token);
      if (result.error) {
        setError(result.error);
        return;
      }
      updateUser(result.updatedUser);
    }
    verify();
    navigate("/");
  }, [updateUser, token, navigate]);

  return error ? (
    <p style={{ color: "white" }}>{error}</p>
  ) : (
    <p style={{ color: "white" }}>Email verification is in process...</p>
  );
};

export default ComfirmVerifyEmailPage;
