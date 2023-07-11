import { createContext, ReactNode, useEffect, useState } from "react";
import { Session } from "../types/identity/Session";
import { IdentityError } from "../types/identity/IdentityError";
import { GetSession } from "../api/identityApi";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthContextType {
  session: Session | undefined;
  setSession: (session: Session) => void;
  updateSession: () => void;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IdentityError>();

  const updateSession = async () => {
    const res = await GetSession();
    if (res.result) {
      setSession(res.session as Session);
    } else if (res.error) {
      setError(res.error as IdentityError);
    }
  };

  useEffect(() => {
    console.log("Auth CONTEXT");
    updateSession().finally(() => {
      setLoading(false);
    });
  }, []);

  //TODO: Investigate React.memo usability

  return (
    <AuthContext.Provider value={{ session, setSession, updateSession }}>
      {loading ? <>Loading...</> : children}
    </AuthContext.Provider>
  );
}
