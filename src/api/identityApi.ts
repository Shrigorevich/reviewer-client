import { LogoutFlow } from "../types/identity/LogoutFlow";
import { LoginWithPasswordMethod } from "../types/identity/LoginWithPasswordMethod";
import { SignInSuccess } from "../types/identity/SignInSuccess";
import axios, { AxiosResponse } from "axios";
import { IdentityFlow } from "../types/identity/IdentityFlow";
import { RegisterWithPasswordMethod } from "../types/identity/RegisterWithPasswordMethod";
import { SessionResponse } from "../types/identity/SessionResponse";
import { RecoverWithCodeMethod } from "../types/identity/RecoveryWithCodeMethod";
import { ChangePasswordSettings } from "../types/identity/ChangePasswordSettings";

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
    throw exception;
  }
};

export const CreateLoginFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/login/browser");
  } catch (exception) {
    throw exception;
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
    throw exception;
  }
};

export const CreateRegisterFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/registration/browser");
  } catch (exception) {
    throw exception;
  }
};

export const GetRecoveryFlow = async (
  id: string
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.get<IdentityFlow>(`/self-service/recovery/flows?id=${id}`);
  } catch (exception) {
    throw exception;
  }
};

export const CreateRecoveryFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/recovery/browser");
  } catch (exception) {
    throw exception;
  }
};

export const GetSettingsFlow = async (
  id: string
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.get<IdentityFlow>(`/self-service/settings/flows?id=${id}`);
  } catch (exception) {
    throw exception;
  }
};

export const CreateSettingsFlow = async (): Promise<
  AxiosResponse<IdentityFlow>
> => {
  try {
    return await api.get<IdentityFlow>("/self-service/settings/browser");
  } catch (exception) {
    throw exception;
  }
};

export const submitLogin = async (
  flowId: string,
  body: LoginWithPasswordMethod
): Promise<AxiosResponse<SignInSuccess>> => {
  try {
    return await api.post<SignInSuccess>(
      `/self-service/login?flow=${flowId}`,
      body
    );
  } catch (exception) {
    throw exception;
  }
};

export const submitRegister = async (
  flowId: string,
  body: RegisterWithPasswordMethod
): Promise<AxiosResponse<SignInSuccess>> => {
  try {
    return await api.post<SignInSuccess>(
      `/self-service/registration?flow=${flowId}`,
      body
    );
  } catch (exception) {
    throw exception;
  }
};

export const submitRecovery = async (
  flowId: string,
  body: RecoverWithCodeMethod
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.post<IdentityFlow>(
      `/self-service/recovery?flow=${flowId}`,
      body
    );
  } catch (exception) {
    throw exception;
  }
};

export const submitPasswordSettings = async (
  flowId: string,
  body: ChangePasswordSettings
): Promise<AxiosResponse<IdentityFlow>> => {
  try {
    return await api.post<IdentityFlow>(
      `/self-service/settings?flow=${flowId}`,
      body
    );
  } catch (exception) {
    throw exception;
  }
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
