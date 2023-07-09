import { FormEvent, useContext, useState } from "react";
import { useLoginFlow } from "../hooks/useLoginFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, useNavigate } from "react-router-dom";
import { SessionResponse } from "../types/identity/SessionResponse";
import { AuthContext } from "../contexts/AuthContext";
import { submitLogin } from "../api/identityApi";
import { LoginWithPasswordMethod } from "../types/identity/LoginWithPasswordMethod";
import { Session } from "../types/identity/Session";

const Login = () => {
  const { flow, loading, error } = useLoginFlow();
  const navigate = useNavigate();
  const [response, setResponse] = useState<SessionResponse>({
    result: false,
  });
  const { setSession } = useContext(AuthContext);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const form = event.currentTarget;
      const formData = new FormData(form);

      // map the entire form data to JSON for the request body
      let body = Object.fromEntries(
        formData
      ) as unknown as LoginWithPasswordMethod;
      body.method = "password";
      console.log(body);

      submitLogin(flow?.ui.action, body)
        .then((res) => {
          console.log("Result" + res.result);
          if (res.result) {
            setSession(res.session as Session);
            navigate("/");
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
