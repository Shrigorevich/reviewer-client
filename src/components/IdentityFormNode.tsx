import { UiNode } from "../types/identity/UiNode";
import { Button, Input } from "@mui/material";

const IdentityFormNode = ({ node }: { node: UiNode }) => {
  const attrs = node.attributes;
  const nodeType = attrs.type;

  switch (nodeType) {
    case "button":
    case "submit":
      return (
        <Button
          type={attrs.type as "submit" | "reset" | "button" | undefined}
          name={attrs.name}
          value={attrs.value}
        >
          {node.meta.label.text}
        </Button>
      );
    default:
      return (
        <div>
          <p>{node.meta?.label?.text}</p>
          <Input
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
