import { useEffect, useState } from "react";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { IdentityError } from "../types/identity/IdentityError";

export const useGetRegisterFlow = (): {
  flow: IdentityFlow | undefined;
  loading: boolean;
  error: IdentityError | undefined;
} => {
  const [flow, setFlow] = useState<IdentityFlow | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError | undefined>();

  useEffect(() => {
    fetch("http://127.0.0.1:4433/self-service/registration/browser", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setError(data.error);
        } else {
          setFlow(data);
        }
      })
      .catch((res) => {
        setLoading(false);
        setError(res);
        console.log("Unhandler exception: " + res);
      });
  }, []);

  return { flow, loading, error };
};