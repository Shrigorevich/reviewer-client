import { Configuration, FrontendApi } from "@ory/client";
import { useEffect, useState } from "react";
import { useGetRegisterFlow } from "../api/useGetRegisterFlow";
import IdentityForm from "../components/IdentityForm";

const Register = () => {
  const { flow, loading, error } = useGetRegisterFlow();
  console.log(flow);
  if (loading) {
    return <>loading</>;
  } else {
    return !error && flow ? <IdentityForm flow={flow} /> : <>Server error</>;
  }
};

export default Register;
