import { UiNode } from "../types/identity/UiNode";

const IdentityFormNode = ({ node }: { node: UiNode }) => {
  const attrs = node.attributes;
  const nodeType = attrs.type;

  switch (nodeType) {
    case "button":
    case "submit":
      return (
        <button
          type={attrs.type as "submit" | "reset" | "button" | undefined}
          name={attrs.name}
          value={attrs.value}
        >
          {node.meta.label.text}
        </button>
      );
    default:
      return (
        <div>
          <p>{node.meta?.label?.text}</p>
          <input
            name={attrs.name}
            type={attrs.type}
            defaultValue={attrs.value}
            required={attrs.required}
            disabled={attrs.disabled}
          />
        </div>
      );
  }
};

export default IdentityFormNode;
