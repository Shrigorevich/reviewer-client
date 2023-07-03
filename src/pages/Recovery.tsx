import { FormEvent, useContext, useState } from "react";
import IdentityForm from "../components/IdentityForm";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useRecoveryFlow } from "../hooks/useRecoveryFlow";
import { RecoveryCredentials } from "../types/identity/RecoveryCredentials";
import { GetFlowResponse } from "../types/identity/GetFlowResponse";
import { submitRecoveryStart } from "../api/identityApi";
import { IdentityFlow } from "../types/identity/IdentityFlow";

const Recovery = () => {
  const { flow, loading, error } = useRecoveryFlow();
  const [response, setResponse] = useState<GetFlowResponse>({
    result: false,
  });

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

      submitRecoveryStart(flow?.ui.action, responseBody as RecoveryCredentials)
        .then((res) => {
          setResponse(res);
          console.log(res);
        })
        .catch(console.log);
    }
  };

  if (response.result) {
    return (
      <div>
        <IdentityForm
          flow={response.flow as IdentityFlow}
          submitHandler={submitHandler}
        />
      </div>
    );
  } else {
    return (
      <div>
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
  }
};

export default Recovery;
