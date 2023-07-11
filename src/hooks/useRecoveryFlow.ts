import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import {
  CreateLoginFlow,
  CreateRecoveryFlow,
  GetRecoveryFlow,
} from "../api/identityApi";
import { useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";

export const useRecoveryFlow = () => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();
  const [search, setParam] = useSearchParams();

  useEffect(() => {
    const flowId = search.get("flow");

    if (flowId) {
      GetRecoveryFlow(flowId)
        .then((res) => {
          console.log(res.data);
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Get recovery error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      CreateRecoveryFlow()
        .then((res) => {
          setParam(`flow=${res.data.id}`, { replace: true });
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create recovery error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { flow, setFlow, loading, error };
};
