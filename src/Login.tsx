import { useState } from "react";
import { useStore } from "./store";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useStore((state) => ({
        logIn: state.logIn
    }))

    const handleLogIn = (event: React.FormEvent) => {
        event.preventDefault();
        logIn();
        navigate("/")
    };

    return (
        <form id="login" onSubmit={handleLogIn}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;