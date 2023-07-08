import { FormEvent, useContext, useState } from "react";
import { useLoginFlow } from "../hooks/useLoginFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SessionResponse } from "../types/identity/SessionResponse";
import { AuthContext } from "../contexts/AuthContext";
import { submitLogin } from "../api/identityApi";
import { LoginCredentials } from "../types/identity/LoginCredentials";
import { Session } from "../types/identity/Session";

const Login = () => {
  const { flow, loading, error } = useLoginFlow();
  const navigate = useNavigate();
  const [response, setResponse] = useState<SessionResponse>({
    result: false
  });
  const { setSession } = useContext(AuthContext);

  interface formDataType {
    [key: string]: FormDataEntryValue;
  }
  const responseBody: formDataType = {};

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const formData = new FormData(event.target as HTMLFormElement);
      formData.forEach(
        (value, property: string) => (responseBody[property] = value)
      );
      
      submitLogin(flow?.ui.action, responseBody as LoginCredentials)
        .then((res) => {
          console.log("Result" + res.result)
          if(res.result) {
            setSession(res.session as Session);
            navigate("/")
          } else {
            setResponse(res);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {loading ? (
        <>loading</>
      ) : !error && flow ? (
        <div>
          <IdentityForm flow={flow} submitHandler={submitHandler} />
          <a href="http://localhost:4000/self-service/recovery/browser">
            Forget password?
          </a>
        </div>
      ) : (
        <>Server error</>
      )}
    </div>
  );
};

export default Login;
