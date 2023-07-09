import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import { CreateRegisterFlow, GetRegisterFlow } from "../api/identityApi";
import { useSearchParams } from "react-router-dom";

export const useRegisterFlow = () => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();
  const [search] = useSearchParams();

  useEffect(() => {
    const flowId = search.get("flow");

    if (flowId) {
      console.log("GET REGISTER FLOW");
      GetRegisterFlow(flowId)
        .then((res) => {
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create login error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      CreateRegisterFlow()
        .then((res) => {
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create login error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { flow, setFlow, loading, error };
};
