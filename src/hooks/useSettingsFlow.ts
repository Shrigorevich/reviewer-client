import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import { CreateSettingsFlow, GetSettingsFlow } from "../api/identityApi";
import { useSearchParams } from "react-router-dom";

export const useSettingsFlow = () => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();
  const [search] = useSearchParams();

  useEffect(() => {
    const flowId = search.get("flow");

    if (flowId) {
      GetSettingsFlow(flowId)
        .then((res) => {
          console.log(res.data);
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create settings error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      CreateSettingsFlow()
        .then((res) => {
          setFlow(res.data);
        })
        .catch((err) => {
          console.log("Create settings error: " + err);
          setError(err.response.data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { flow, setFlow, loading, error };
};
