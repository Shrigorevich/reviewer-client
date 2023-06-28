import { LogoutFlow } from "../types/identity/LogoutFlow";

export const logout = async (): Promise<boolean> => {
  try {
    const flow: LogoutFlow = await getLogoutFlow();
    return await submitLogout(flow);
  } catch (exception) {
    console.log("Unhandled exception: " + exception);
    return false;
  }
};

const getLogoutFlow = async (): Promise<LogoutFlow> => {
  const response = await fetch(
    "http://127.0.0.1:4433/self-service/logout/browser",
    {
      credentials: "include",
    }
  );
  const result = await response.json();
  return result as LogoutFlow;
};

const submitLogout = async (flow: LogoutFlow): Promise<boolean> => {
  const response = await fetch(flow.logout_url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return response.ok;
};
