import { IdentityError } from "./IdentityError";

export type RedirectError = {
  redirect_browser_to: string;
  error: IdentityError;
};
