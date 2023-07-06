import { FormEvent } from "react";
import IdentityForm from "../components/IdentityForm";
import { Link } from "react-router-dom";
import { useRecoveryFlow } from "../hooks/useRecoveryFlow";
import { submitRecovery } from "../api/identityApi";

const Recovery = () => {
  const { flow, loading, error } = useRecoveryFlow();

  interface formDataType {
    [key: string]: FormDataEntryValue;
  }
  const responseBody: formDataType = {};

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    submitRecovery(flow?.ui.action as string, formData);
  };

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
};

export default Recovery;
