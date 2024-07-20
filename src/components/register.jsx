import { Link } from "react-router-dom"
export const Register = () => {
    return (
        <>
            <div>Register page</div>
            <Link to={'/login'}>To login page</Link>
        </>

    )
}