import { Link } from "react-router-dom";
import { Register } from "../register/register";
import { useNavigate } from "react-router-dom";
import { PasswordInputBase } from "../../ui/password-input-base";
import { TextInputBase } from "../../ui/text-input-base";
import classNames from "classnames";
import { Button, Grid, AspectRatio, Container, Flex } from "@mantine/core";
import GoogleIcon from "../../assets/Google.svg";
import FacebookIcon from "../../assets/FB.svg";
import X from "../../assets/X.svg";
import loginGirl from "../../assets/login-girl.svg";
import { fakeAuthProvider } from "../../services/auth";
import styles from "./login.module.css"
import { useState } from "react";
import "../../App.css"

const password = <svg width="16" height="16" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20.25C10.663 20.25 11.2989 19.9866 11.7678 19.5178C12.2366 19.0489 12.5 18.413 12.5 17.75C12.5 17.087 12.2366 16.4511 11.7678 15.9822C11.2989 15.5134 10.663 15.25 10 15.25C9.33696 15.25 8.70107 15.5134 8.23223 15.9822C7.76339 16.4511 7.5 17.087 7.5 17.75C7.5 18.413 7.76339 19.0489 8.23223 19.5178C8.70107 19.9866 9.33696 20.25 10 20.25ZM17.5 9C18.163 9 18.7989 9.26339 19.2678 9.73223C19.7366 10.2011 20 10.837 20 11.5V24C20 24.663 19.7366 25.2989 19.2678 25.7678C18.7989 26.2366 18.163 26.5 17.5 26.5H2.5C1.83696 26.5 1.20107 26.2366 0.732233 25.7678C0.263392 25.2989 0 24.663 0 24V11.5C0 10.837 0.263392 10.2011 0.732233 9.73223C1.20107 9.26339 1.83696 9 2.5 9H3.75V6.5C3.75 4.8424 4.40848 3.25269 5.58058 2.08058C6.75269 0.90848 8.3424 0.25 10 0.25C10.8208 0.25 11.6335 0.411661 12.3918 0.725753C13.1501 1.03984 13.8391 1.50022 14.4194 2.08058C14.9998 2.66095 15.4602 3.34994 15.7742 4.10823C16.0883 4.86651 16.25 5.67924 16.25 6.5V9H17.5ZM10 2.75C9.00544 2.75 8.05161 3.14509 7.34835 3.84835C6.64509 4.55161 6.25 5.50544 6.25 6.5V9H13.75V6.5C13.75 5.50544 13.3549 4.55161 12.6517 3.84835C11.9484 3.14509 10.9946 2.75 10 2.75Z" fill="#212427" />
</svg>;

export const user = <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47322 11.3261 10 10 10C8.67392 10 7.40215 9.47322 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z" fill="#212427" />
</svg>;

export const Login = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("")

    function onInputChange(e) {
        setUserName(e.currentTarget.value)
    }

    const onLoginClick = async () => {
        await fakeAuthProvider.signin();
        navigate("/account");
    }


    return (
        <div className="wrapper" >
            <div className="container">
                <Flex direction="column" gap={'2rem'}>
                    <Flex direction="column" gap={'0.75rem'}>
                        <h1 className={styles.title}>Sign In</h1>
                        <TextInputBase value={userName} placeholder="Enter Username" leftSection={user} onChange={onInputChange} />
                        <PasswordInputBase value={userPassword} placeholder="Enter Password" leftSection={password} onChange={(e) => setUserPassword(e.currentTarget.value)} />
                        <Button onClick={onLoginClick} size="sm" classNames={{ root: styles['button-Login'] }} variant="filled" color="rgba(255, 144, 144, 1)" radius="0.3rem">
                            <span className={styles['button-login-text']}>Login</span>
                        </Button>
                        <span className={styles['register-account']}>Don't have an account? <Link to={'/register'} style={{ textDecoration: 'none' }}>Create one</Link></span>
                    </Flex>

                </Flex>
                <AspectRatio ratio={1} maw={450} >
                    <img src={loginGirl} />
                </AspectRatio>

            </div>

        </div >

    )
};      