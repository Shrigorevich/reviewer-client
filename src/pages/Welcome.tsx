import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../api/logout";
import { Session } from "../types/identity/Session";
import { AuthContext } from "../contexts/AuthContext";

const Welcome = () => {
  const { session } = useContext(AuthContext);
  const logoutHandler = () => {
    logout().then((isLoggedOut) => {
      if (isLoggedOut) window.location.reload();
    });
  };

  return (
    <div>
      <h3>Welcome {session?.id}</h3>
      {session ? (
        <button onClick={logoutHandler}>Log Out</button>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Welcome;
