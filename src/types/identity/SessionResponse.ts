import { IdentityError } from "./IdentityError";
import { Session } from "./Session";

export type SessionResponse = {
  result: boolean;
  session: Session | undefined;
  error: IdentityError | undefined;
};
