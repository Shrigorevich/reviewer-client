import { UiNode } from "../types/identity/UiNode";

const IdentityFormNode = ({ node }: { node: UiNode }) => {
  if (node.attributes.type === "submit") {
    return <input type={node.attributes.type} value={node.meta.label.text} />;
  }
  return (
    <div>
      {node.meta?.label ? <label>{node.meta.label.text}</label> : null}
      <br />
      <input
        name={node.attributes.name}
        type={node.attributes.type}
        value={node.attributes.value}
      />
    </div>
  );
};

export default IdentityFormNode;
