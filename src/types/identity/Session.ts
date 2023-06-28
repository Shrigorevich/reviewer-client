import { Identity } from "./Identity";

export type Session = {
  active: boolean;
  id: string;
  authentication_methods: any[];
  devices: any[];
  identity: Identity;
  authenticated_at: any; //date
  issued_at: any; //date
  expires_at: any; //date
};
