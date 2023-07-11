import { FormEvent } from "react";
import IdentityForm from "../components/IdentityForm/IdentityForm";
import { Link, useNavigate } from "react-router-dom";
import { useRecoveryFlow } from "../hooks/useRecoveryFlow";
import { submitRecovery } from "../api/identityApi";
import { RecoverWithCodeMethod } from "../types/identity/RecoveryWithCodeMethod";
import { AxiosError } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { RedirectError } from "../types/identity/RedirectError";

const Recovery = () => {
  const { flow, setFlow, loading, error } = useRecoveryFlow();
  const navigate = useNavigate();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const form = event.currentTarget;
      const formData = new FormData(form);

      let body = Object.fromEntries(
        formData
      ) as unknown as RecoverWithCodeMethod;
      body.method = "code";

      submitRecovery(flow?.id, body)
        .then((res) => {
          console.log(res);
          setFlow(res.data);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          if (err.request.status === 422) {
            navigate((err.response?.data as RedirectError).redirect_browser_to);
          } else {
            console.log("login error: " + err);
            setFlow(err.response?.data as IdentityFlow);
          }
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
        </div>
      ) : (
        <>Server error</>
      )}
    </div>
  );
};

export default Recovery;
