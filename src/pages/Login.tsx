import { FormEvent, useContext, useState } from "react";
import { useLoginFlow } from "../hooks/useLoginFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, Navigate } from "react-router-dom";
import { LoginCredentials } from "../types/identity/LoginCredentials";
import { Session } from "../types/identity/Session";
import { SessionResponse } from "../types/identity/SessionResponse";
import { AuthContext } from "../contexts/AuthContext";
import { submitLogin } from "../api/identityApi";

const Login = () => {
  const { flow, loading, error } = useLoginFlow();
  const [response, setResponse] = useState<SessionResponse>({
    result: false,
    error: undefined,
    session: undefined,
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
          setResponse(res);
          if (res.result) {
            setSession(res.session as Session);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <div>
      {response.result ? <Navigate to="/" replace={true} /> : null}
      <Link to="/">Home</Link>
      {loading ? (
        <>loading</>
      ) : !error && flow ? (
        <div>
          <IdentityForm flow={flow} submitHandler={submitHandler} />
          <Link to="/recovery">Forget password?</Link>
        </div>
      ) : (
        <>Server error</>
      )}
    </div>
  );
};

export default Login;
