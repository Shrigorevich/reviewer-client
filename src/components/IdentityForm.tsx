import { FormEvent } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import IdentityFormNode from "./IdentityFormNode";

const IdentityForm = ({
  flow,
  submitHandler,
}: {
  flow: IdentityFlow;
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      action={flow.ui.action}
      method={flow.ui.method}
      onSubmit={submitHandler}
    >
      {flow.ui.nodes.map((node, key) => (
        <IdentityFormNode node={node} key={key} />
      ))}
    </form>
  );
};

export default IdentityForm;
