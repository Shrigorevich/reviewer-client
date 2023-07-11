import { FormEvent, useContext, useEffect } from "react";
import IdentityForm from "../components/IdentityForm/IdentityForm";
import { Link } from "react-router-dom";
import { submitLogin, submitPasswordSettings } from "../api/identityApi";
import { LoginWithPasswordMethod } from "../types/identity/LoginWithPasswordMethod";
import { AxiosError } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { useSettingsFlow } from "../hooks/useSettingsFlow";
import { ChangePasswordSettings } from "../types/identity/ChangePasswordSettings";
import { AuthContext } from "../contexts/AuthContext";

const Settings = () => {
  const { flow, setFlow, loading, error } = useSettingsFlow();
  const { updateSession } = useContext(AuthContext);

  useEffect(() => {
    updateSession();
  }, []);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (flow) {
      const form = event.currentTarget;
      const formData = new FormData(form);

      let body = Object.fromEntries(
        formData
      ) as unknown as ChangePasswordSettings;
      body.method = "password";

      submitPasswordSettings(flow?.id, body)
        .then((res) => {
          console.log(res.data);
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

export default Settings;
