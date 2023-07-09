import { FormEvent, useContext } from "react";
import { useLoginFlow } from "../hooks/useLoginFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { submitLogin } from "../api/identityApi";
import { LoginWithPasswordMethod } from "../types/identity/LoginWithPasswordMethod";
import { AxiosError } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";

const Login = () => {
  const { flow, setFlow, loading, error } = useLoginFlow();
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const form = event.currentTarget;
      const formData = new FormData(form);

      let body = Object.fromEntries(
        formData
      ) as unknown as LoginWithPasswordMethod;
      body.method = "password";

      submitLogin(flow?.id, body)
        .then((res) => {
          setSession(res.data.session);
          navigate("/");
        })
        .catch((err: AxiosError<IdentityFlow>) => {
          console.log("login error: " + err);
          setFlow(err.response?.data);
        });
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
