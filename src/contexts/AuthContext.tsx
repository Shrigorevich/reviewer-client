import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Session } from "../types/identity/Session";
import { IdentityError } from "../types/identity/IdentityError";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthContextType {
  session: Session | undefined;
  setSession: (session: Session) => void;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IdentityError>();

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:4433/sessions/whoami", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data);
        } else {
          setSession(data);
        }
      })
      .catch((data) => {
        console.log("Unhandler exception: " + data);
        setError(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {loading ? <>Loading...</> : children}
    </AuthContext.Provider>
  );
}
