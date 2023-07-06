import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";
import { GetRegisterFlow } from "../api/identityApi";

export const useRegisterFlow = (): {
  flow?: IdentityFlow;
  loading: boolean;
  error?: IdentityError;
} => {
  const [flow, setFlow] = useState<IdentityFlow>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();

  useEffect(() => {
    GetRegisterFlow()
      .then((res) => {
        if (res.result) {
          setFlow(res.flow);
        } else if (res.error) {
          setError(res.error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { flow, loading, error };
};
