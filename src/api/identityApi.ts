import { GetFlowResponse } from "../types/identity/GetFlowResponse";
import { LoginCredentials } from "../types/identity/LoginCredentials";
import { LogoutFlow } from "../types/identity/LogoutFlow";
import { RegisterCredentials } from "../types/identity/RegisterCredentials";
import { SessionResponse } from "../types/identity/SessionResponse";

const baseUrl = "/.ory";

export const GetSession = async (): Promise<SessionResponse> => {
  try {
    const response = await fetch(`${baseUrl}/sessions/whoami`, {
      credentials: "include",
    });
    const payload = await response.json();
    console.log(payload);
    const result = {
      result: response.ok,
    } as SessionResponse;

    response.ok ? (result.session = payload.session) : (result.error = payload); //TODO: remove payload.session
    return result;
  } catch (exception) {
    return {
      result: false,
    };
  }
};

export const GetLoginFlow = async (): Promise<GetFlowResponse> => {
  try {
    const response = await fetch(`${baseUrl}/self-service/login/browser`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    const payload = await response.json();
    console.log("Payload: " + payload);

    let result: GetFlowResponse = {
      result: response.ok,
    };
    response.ok ? (result.flow = payload) : (result.error = payload);
    return result;
  } catch (exception) {
    return {
      result: false,
    };
  }
};

export const GetRegisterFlow = async (): Promise<GetFlowResponse> => {
  try {
    const response = await fetch(
      `${baseUrl}/self-service/registration/browser`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const payload = await response.json();
    console.log("Payload: " + payload);

    let result: GetFlowResponse = {
      result: response.ok,
    };
    response.ok ? (result.flow = payload) : (result.error = payload);
    return result;
  } catch (exception) {
    return {
      result: false,
    };
  }
};

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

  const payload = await response.json();
  console.log(payload);
  const result = {
    result: response.ok,
  } as SessionResponse;

  response.ok ? (result.session = payload.session) : (result.error = payload); //TODO: remove payload.session
  return result;
};

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

  const payload = await response.json();
  console.log(payload);
  const result = {
    result: response.ok,
  } as SessionResponse;

  response.ok ? (result.session = payload.session) : (result.error = payload); //TODO: remove payload.session
  return result;
};

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
  const response = await fetch(`${baseUrl}/self-service/logout/browser`, {
    credentials: "include",
  });
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
