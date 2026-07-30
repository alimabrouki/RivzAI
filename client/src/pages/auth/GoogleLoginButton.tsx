import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { API_BASE } from "../../api/signupUser";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      return {
        success: false,
        error: "no credential received",
      };
    }
    try {
      const response = await fetch(`${API_BASE}auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.error,
        };
      }

      localStorage.setItem("token", responseData.appToken);
      login(responseData.user);
      navigate("/");
      return responseData;
    } catch {
      return {
        success: false,
        error: "network error",
      };
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("google login failed")}
        theme="filled_black"
        shape="pill"
        size="large"
        text="continue_with"
        width="250"
      />
    </div>
  );
}

export default GoogleLoginButton;
