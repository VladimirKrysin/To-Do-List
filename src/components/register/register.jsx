import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { TextInputBase } from "../../ui/text-input-base"
import styles from "./register.module.css";
import { AspectRatio, Button, Flex } from "@mantine/core";
import { user } from "../login/login.jsx";
import RegisterImage from "../../assets/RegisterImage.png";
import { PasswordInputBase } from "../../ui/password-input-base.jsx";
import { fakeAuthProvider } from "../../services/auth";
import classnames from "classnames";

const PasswordIcon = <svg width="16" height="17" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20.25C10.663 20.25 11.2989 19.9866 11.7678 19.5178C12.2366 19.0489 12.5 18.413 12.5 17.75C12.5 17.087 12.2366 16.4511 11.7678 15.9822C11.2989 15.5134 10.663 15.25 10 15.25C9.33696 15.25 8.70107 15.5134 8.23223 15.9822C7.76339 16.4511 7.5 17.087 7.5 17.75C7.5 18.413 7.76339 19.0489 8.23223 19.5178C8.70107 19.9866 9.33696 20.25 10 20.25ZM17.5 9C18.163 9 18.7989 9.26339 19.2678 9.73223C19.7366 10.2011 20 10.837 20 11.5V24C20 24.663 19.7366 25.2989 19.2678 25.7678C18.7989 26.2366 18.163 26.5 17.5 26.5H2.5C1.83696 26.5 1.20107 26.2366 0.732233 25.7678C0.263392 25.2989 0 24.663 0 24V11.5C0 10.837 0.263392 10.2011 0.732233 9.73223C1.20107 9.26339 1.83696 9 2.5 9H3.75V6.5C3.75 4.8424 4.40848 3.25269 5.58058 2.08058C6.75269 0.90848 8.3424 0.25 10 0.25C10.8208 0.25 11.6335 0.411661 12.3918 0.725753C13.1501 1.03984 13.8391 1.50022 14.4194 2.08058C14.9998 2.66095 15.4602 3.34994 15.7742 4.10823C16.0883 4.86651 16.25 5.67924 16.25 6.5V9H17.5ZM10 2.75C9.00544 2.75 8.05161 3.14509 7.34835 3.84835C6.64509 4.55161 6.25 5.50544 6.25 6.5V9H13.75V6.5C13.75 5.50544 13.3549 4.55161 12.6517 3.84835C11.9484 3.14509 10.9946 2.75 10 2.75Z" fill="#212427" />
</svg>

const IconFirstName = <svg width="16" height="17" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.0003 10.4999C16.2555 10.4999 18.0837 8.67175 18.0837 6.41659C18.0837 4.16142 16.2555 2.33325 14.0003 2.33325C11.7452 2.33325 9.91699 4.16142 9.91699 6.41659C9.91699 8.67175 11.7452 10.4999 14.0003 10.4999Z" fill="black" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2.3335 23.9166C2.3335 18.7617 7.03458 14.5833 12.8335 14.5833" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.0833 24.4999L23.9167 18.6666L21.5833 16.3333L15.75 22.1666V24.4999H18.0833Z" fill="black" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const IconLastName = <svg width="16" height="17" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.0003 10.4999C16.2555 10.4999 18.0837 8.67175 18.0837 6.41659C18.0837 4.16142 16.2555 2.33325 14.0003 2.33325C11.7452 2.33325 9.91699 4.16142 9.91699 6.41659C9.91699 8.67175 11.7452 10.4999 14.0003 10.4999Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2.3335 23.9166C2.3335 18.7617 7.03458 14.5833 12.8335 14.5833M18.0835 24.4999L23.9168 18.6666L21.5835 16.3333L15.7502 22.1666V24.4999H18.0835Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const IconMail = <svg width="16" height="17" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 0H3C1.625 0 0.5125 1.125 0.5125 2.5L0.5 17.5C0.5 18.875 1.625 20 3 20H23C24.375 20 25.5 18.875 25.5 17.5V2.5C25.5 1.125 24.375 0 23 0ZM23 5L13 11.25L3 5V2.5L13 8.75L23 2.5V5Z" fill="black" />
</svg>

const IconConfirm = <svg width="16" height="17" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20.25C9.33696 20.25 8.70107 19.9866 8.23223 19.5178C7.76339 19.0489 7.5 18.413 7.5 17.75C7.5 16.3625 8.6125 15.25 10 15.25C10.663 15.25 11.2989 15.5134 11.7678 15.9822C12.2366 16.4511 12.5 17.087 12.5 17.75C12.5 18.413 12.2366 19.0489 11.7678 19.5178C11.2989 19.9866 10.663 20.25 10 20.25ZM17.5 24V11.5H2.5V24H17.5ZM17.5 9C18.163 9 18.7989 9.26339 19.2678 9.73223C19.7366 10.2011 20 10.837 20 11.5V24C20 24.663 19.7366 25.2989 19.2678 25.7678C18.7989 26.2366 18.163 26.5 17.5 26.5H2.5C1.83696 26.5 1.20107 26.2366 0.732233 25.7678C0.263392 25.2989 0 24.663 0 24V11.5C0 10.1125 1.1125 9 2.5 9H3.75V6.5C3.75 4.8424 4.40848 3.25269 5.58058 2.08058C6.75269 0.90848 8.3424 0.25 10 0.25C10.8208 0.25 11.6335 0.411661 12.3918 0.725753C13.1501 1.03984 13.8391 1.50022 14.4194 2.08058C14.9998 2.66095 15.4602 3.34994 15.7742 4.10823C16.0883 4.86651 16.25 5.67924 16.25 6.5V9H17.5ZM10 2.75C9.00544 2.75 8.05161 3.14509 7.34835 3.84835C6.64509 4.55161 6.25 5.50544 6.25 6.5V9H13.75V6.5C13.75 5.50544 13.3549 4.55161 12.6517 3.84835C11.9484 3.14509 10.9946 2.75 10 2.75Z" fill="black" />
</svg>


export const Register = () => {
    const navigate = useNavigate();

    const onRegisterClick = async () => {
        await fakeAuthProvider.signin();
        navigate("/dashboard");
    }
    return (
        <div className="wrapper">
            <div className={classnames("container", styles["register-container"])}>
                <AspectRatio ratio={0.66} maw={250}>
                    <img src={RegisterImage} />
                </AspectRatio>
                <Flex direction="column" gap="0.75rem">
                    <h1>Sign Up</h1>
                    <TextInputBase placeholder="Enter First Name" leftSection={IconFirstName} />
                    <TextInputBase placeholder="Enter Last Name" leftSection={IconLastName} />
                    <TextInputBase placeholder="Enter UserName" leftSection={user} />
                    <TextInputBase placeholder="Enter Email" leftSection={IconMail} />
                    <PasswordInputBase placeholder="Enter Password" leftSection={PasswordIcon} />
                    <PasswordInputBase placeholder="Confirm Password" leftSection={IconConfirm} />
                    <Button onClick={onRegisterClick} size="sm" classNames={{ root: styles['button-Login'] }} variant="filled" color="rgba(255, 144, 144, 1)" radius="0.3rem">
                        Register
                    </Button>
                    <span>Already have an account? <Link to={'/login'} style={{ textDecoration: 'none' }}>Sign in</Link></span>
                </Flex>
            </div>
        </div >

    )
}