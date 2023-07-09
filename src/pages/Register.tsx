import { FormEvent, useContext, useEffect, useState } from "react";
import { useRegisterFlow } from "../hooks/useRegisterFlow";
import IdentityForm from "../components/IdentityForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { submitRegister } from "../api/identityApi";
import { RegisterWithPasswordMethod } from "../types/identity/RegisterWithPasswordMethod";
import { AxiosError } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";

const Register = () => {
  const { flow, setFlow, loading, error } = useRegisterFlow();
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const form = event.currentTarget;
      const formData = new FormData(form);

      let body = Object.fromEntries(
        formData
      ) as unknown as RegisterWithPasswordMethod;
      body.method = "password";

      submitRegister(flow?.id, body)
        .then((res) => {
          setSession(res.data.session);
          navigate("/");
        })
        .catch((err: AxiosError<IdentityFlow>) => {
          console.log(err.toJSON());
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

export default Register;
