import { Link } from "react-router-dom";

const Welcome = () => {
    return (<div>
        <h3>Welcome</h3>
        <Link to="./Register">Register</Link>
    </div>)
}

export default Welcome;