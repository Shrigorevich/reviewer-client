import { IdentityError } from "./IdentityError";
import { IdentityFlow } from "./IdentityFlow";

export type GetFlowResponse = {
    result: boolean;
    error?: IdentityError;
    flow?: IdentityFlow;
}