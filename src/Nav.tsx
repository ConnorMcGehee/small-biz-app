import { Link } from "react-router-dom";
import { useStore } from "./store";

function Nav() {
    const { isLoggedIn, logOut } = useStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        logOut: state.logOut
    }));

    return (
        <nav>
            <div id="nav-links">
                <Link to="/">Home</Link>

                {isLoggedIn ?
                    <button onClick={logOut}>Logout</button>
                    : <Link to="/login">
                        <button>Login</button>
                    </Link>
                }
            </div>
        </nav>
    )
}

export default Nav;