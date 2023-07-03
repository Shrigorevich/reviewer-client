import { FormEvent, useContext, useEffect, useState } from "react";
import { useRegisterFlow } from "../hooks/useRegisterFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, Navigate } from "react-router-dom";
import { RegisterCredentials } from "../types/identity/RegisterCredentials";
import { SessionResponse } from "../types/identity/SessionResponse";
import { Session } from "../types/identity/Session";
import { AuthContext } from "../contexts/AuthContext";
import { submitRegister } from "../api/identityApi";

const Register = () => {
  const { flow, loading, error } = useRegisterFlow();
  const [response, setResponse] = useState<SessionResponse>({
    result: false,
  });
  const { setSession } = useContext(AuthContext);

  interface formDataType {
    [key: string]: string;
  }
  const responseBody: formDataType = {};

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const formData = new FormData(event.target as HTMLFormElement);
      formData.forEach(
        (value, property: string) => (responseBody[property] = value.toString())
      );
      console.log(responseBody);
      let regCreds: RegisterCredentials = {
        csrf_token: responseBody["csrf_token"],
        password: responseBody["password"],
        traits: {
          login: responseBody["traits.login"],
          email: responseBody["traits.email"],
        },
      };

      submitRegister(flow.ui.action, regCreds)
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
        <IdentityForm flow={flow} submitHandler={submitHandler} />
      ) : (
        <>Server error</>
      )}
    </div>
  );
};

export default Register;
