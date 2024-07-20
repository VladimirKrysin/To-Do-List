import { Link } from "react-router-dom";
import { Register } from "./register";

export const Login = () => {
    return (
        <>
            <div>Login page</div>
            <button>
                <Link to={'/register'}>To registration page</Link>
            </button>
            <div>
                <Link to={'/account'}>To account page</Link>
            </div>
        </>

    )
};      