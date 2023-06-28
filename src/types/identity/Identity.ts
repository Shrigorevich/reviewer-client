import { IdentityTraits } from "./IdentityTraits";

export type Identity = {
  created_at: any; //date
  id: string;
  metadata_public: any;
  recovery_addresses: any[];
  schema_id: string;
  schema_url: string;
  state: string;
  state_changed_at: any; //date
  traits: IdentityTraits;
  updated_at: any; //date
  verifiable_addresses: any[];
};
