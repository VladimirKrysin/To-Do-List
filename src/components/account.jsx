import { Link, Outlet } from "react-router-dom"
export const Account = () => {
    return (
        <>
            <div>Account</div>
            <Link to={'dashboard'}>To Dashboard</Link>
            <Link to={'tasks'}>To my tasks</Link>
            <Link to={'vital-tasks'}>To vital tasks </Link>
            <Link to={'info'}>To info page </Link>

            <Outlet />

        </>

    )
}