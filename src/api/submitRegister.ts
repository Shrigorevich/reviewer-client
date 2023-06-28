import { RegisterCredentials } from "../types/identity/RegisterCredentials";
import { SessionResponse } from "../types/identity/SessionResponse";

export const submitRegister = async (
  url: string,
  credentials: RegisterCredentials
): Promise<SessionResponse> => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: "password",
      ...credentials,
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
