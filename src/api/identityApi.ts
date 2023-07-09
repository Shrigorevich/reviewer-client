import { GetFlowResponse } from "../types/identity/GetFlowResponse";
import { LogoutFlow } from "../types/identity/LogoutFlow";
import { LoginWithPasswordMethod } from "../types/identity/LoginWithPasswordMethod";
import { SignInSuccess } from "../types/identity/SignInSuccess";
import axios, { AxiosResponse } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { UpdateRegistrationFlowWithPasswordMethod } from "@ory/client";
import { RegisterWithPasswordMethod } from "../types/identity/RegisterWithPasswordMethod";
import { SessionResponse } from "../types/identity/SessionResponse";

const baseUrl = "http://localhost:4000";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

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

    response.ok ? (result.session = payload) : (result.error = payload);
    return result;
  } catch (exception) {
    return {
      result: false,
    };
  }
};

export const GetLoginFlow = async (
  id: string
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.get<IdentityFlow>(`/self-service/login/flows?id=${id}`);
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const CreateLoginFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/login/browser");
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const GetRegisterFlow = async (
  id: string
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.get<IdentityFlow>(
      `/self-service/registration/flows?id=${id}`
    );
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const CreateRegisterFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/registration/browser");
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const GetRecoveryFlow = async (id: string): Promise<GetFlowResponse> => {
  try {
    const response = await fetch(
      `${baseUrl}/self-service/recovery/flows?id=${id}`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const payload = await response.json();
    console.log(payload);

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
  flowId: string,
  body: LoginWithPasswordMethod
): Promise<AxiosResponse<SignInSuccess>> => {
  try {
    return await api.post<SignInSuccess>(
      `/self-service/login?flow=${flowId}`,
      body,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const submitRegister = async (
  flowId: string,
  body: RegisterWithPasswordMethod
): Promise<AxiosResponse<SignInSuccess>> => {
  try {
    return await api.post<SignInSuccess>(
      `/self-service/registration?flow=${flowId}`,
      body,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (exception) {
    return Promise.reject(exception);
  }
};

export const submitRecovery = async (
  url: string,
  formData: FormData
): Promise<GetFlowResponse> => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formData,
  });

  const payload = await response.json();
  console.log(payload);

  let result: GetFlowResponse = {
    result: response.ok,
  };
  response.ok ? (result.flow = payload) : (result.error = payload);
  return result;
};

export const Logout = async (): Promise<boolean> => {
  try {
    const logoutFlowResponse = await fetch(
      `${baseUrl}/self-service/logout/browser`,
      {
        credentials: "include",
      }
    );
    const flow: LogoutFlow = await logoutFlowResponse.json();
    const response = await fetch(flow.logout_url, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    return response.ok;
  } catch (exception) {
    console.log("Unhandled exception: " + exception);
    return false;
  }
};
