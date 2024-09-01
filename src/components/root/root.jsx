import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardLogo from "../../assets/Dashboard.svg?react";
import styles from "../dashboard/dashboard.module.css"
import { Flex } from "@mantine/core";
import { Header } from '../header/header.jsx';

export const Root = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("dashboard")
    }, []);

    return <>
        <Header headerLogo={<DashboardLogo />} />
        <Flex className={styles.pageContainer}>
            <nav className={styles.navigation}>
            </nav>
            <Outlet />
        </Flex >
    </>

};