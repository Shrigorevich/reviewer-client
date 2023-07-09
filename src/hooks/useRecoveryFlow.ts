import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import { CreateLoginFlow, GetRecoveryFlow } from "../api/identityApi";
import { useSearchParams } from "react-router-dom";

export const useRecoveryFlow = (): {
  flow?: IdentityFlow;
  loading: boolean;
  error?: IdentityError;
} => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const flowId = searchParams.get("flow");
    if (flowId && flowId.trim() !== "") {
      GetRecoveryFlow(flowId)
        .then((res) => {
          if (res.result) {
            setFlow(res.flow);
          } else if (res.error) {
            setError(res.error);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      //TODO: need refactoring
      setError({
        error: {
          message: "No flowId",
          code: 0,
          id: "",
          reason: "",
          status: "",
        },
      });
    }
  }, []);

  return { flow, loading, error };
};
