import { LoginCredentials } from "../types/identity/LoginCredentials";
import { SessionResponse } from "../types/identity/SessionResponse";

export const submitLogin = async (
  url: string,
  credentials: LoginCredentials
): Promise<SessionResponse> => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...credentials,
      method: "password",
    }),
  });

  const result = await response.json();
  if (response.ok) {
    return {
      result: true,
      session: result.session,
      error: undefined,
    };
  } else {
    return {
      result: false,
      session: undefined,
      error: result,
    };
  }
};
