import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Session } from "../types/identity/Session";
import { IdentityError } from "../types/identity/IdentityError";
import { GetSession } from "../api/identityApi";

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
    GetSession().then(res => {
      if(res.result) {
        setSession(res.session as Session)
      } else if(res.error) {
        setError(res.error as IdentityError)
      }
    })
    .finally(() => setLoading(false))
  }, []);

  //TODO: Investigate React.memo usability

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {loading ? <>Loading...</> : children}
    </AuthContext.Provider>
  );
}
