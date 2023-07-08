import { UiNode } from "../types/identity/UiNode";

const IdentityFormNode = ({ node, key }: { node: UiNode, key: number }) => {
  const attrs = node.attributes
    const nodeType = attrs.type

    switch (nodeType) {
      case "button":
      case "submit":
        return (
          <button
            type={attrs.type as "submit" | "reset" | "button" | undefined}
            name={attrs.name}
            value={attrs.value}
            key={key}
          />
        )
      default:
        return (
          <input
            name={attrs.name}
            type={attrs.type}
            defaultValue={attrs.value}
            required={attrs.required}
            disabled={attrs.disabled}
            key={key}
          />
        )
    }
};

export default IdentityFormNode;
