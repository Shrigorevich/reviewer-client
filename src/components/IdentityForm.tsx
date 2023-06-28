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
    <form onSubmit={submitHandler}>
      {flow.ui.nodes.map((node, i) => (
        <IdentityFormNode node={node} key={i} />
      ))}
    </form>
  );
};

export default IdentityForm;
