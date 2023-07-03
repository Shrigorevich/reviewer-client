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
          <Link to="/register">Register</Link>
          <br />
          <Link to="/.ory/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Welcome;
