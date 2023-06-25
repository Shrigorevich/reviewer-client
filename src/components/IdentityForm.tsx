import { IdentityFlow } from "../types/identity/IdentityFlow";
import IdentityFormNode from "./IdentityFormNode";

const IdentityForm = ({ flow }: { flow: IdentityFlow }) => {
  interface formDataType {
    [key: string]: FormDataEntryValue;
  }
  const responseBody: formDataType = {};

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );
    console.log(responseBody);

    fetch(flow.ui.action, {
      method: flow.ui.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "password",
        csrf_token: responseBody["csrf_token"],
        password: responseBody["password"],
        traits: {
          email: responseBody["traits.email"],
        },
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
  };

  return (
    <form onSubmit={submitHandler}>
      {flow.ui.nodes.map((node, i) => (
        <IdentityFormNode node={node} key={i} />
      ))}
    </form>
  );
};

export default IdentityForm;
