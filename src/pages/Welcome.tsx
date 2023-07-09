import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Logout } from "../api/identityApi";

const Welcome = () => {
  const { session } = useContext(AuthContext);
  const logoutHandler = () => {
    Logout().then((isLoggedOut) => {
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
          <a href="http://localhost:4000/self-service/registration/browser">
            Sign On
          </a>
          <br />
          <a href="http://localhost:4000/self-service/login/browser">Login</a>
        </div>
      )}
    </div>
  );
};

export default Welcome;
