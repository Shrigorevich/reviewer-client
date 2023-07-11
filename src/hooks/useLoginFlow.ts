import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import { CreateLoginFlow, GetLoginFlow } from "../api/identityApi";
import { useSearchParams } from "react-router-dom";
// {
//   flow?: IdentityFlow;
//   loading: boolean;
//   error?: IdentityError;
// }
export const useLoginFlow = () => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();
  const [search] = useSearchParams();

  useEffect(() => {
    const flowId = search.get("flow");

    if (flowId) {
      GetLoginFlow(flowId)
        .then((res) => {
          console.log(res.data);
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create login error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      CreateLoginFlow()
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
