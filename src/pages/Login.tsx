import { FormEvent, useContext, useState } from "react";
import { useGetLoginFlow } from "../api/useGetLoginFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, Navigate } from "react-router-dom";
import { submitLogin } from "../api/submitLogin";
import { LoginCredentials } from "../types/identity/LoginCredentials";
import { Session } from "../types/identity/Session";
import { SessionResponse } from "../types/identity/SessionResponse";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { flow, loading, error } = useGetLoginFlow();
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
      console.log(responseBody);

      submitLogin(flow?.ui.action, responseBody as LoginCredentials)
        .then((res) => {
          setResponse(res);
          if (res.result) {
            console.log(res);
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
        <IdentityForm flow={flow} submitHandler={submitHandler} />
      ) : (
        <>Server error</>
      )}
    </div>
  );
};

export default Login;
