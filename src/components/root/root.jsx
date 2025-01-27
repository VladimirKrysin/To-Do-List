import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardLogo from "../../assets/Dashboard.svg?react";
import { Icon } from '../../ui/icon-base.jsx';
import { MenuItem } from '../../ui/menu-item.jsx';
import styles from "./root.module.css"
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
                <ul className={styles.navigationList}>
                    <MenuItem text="Дашборд" icon={<Icon name="dashboard" color="#FFFFFF" />} />
                </ul>
            </nav>
            <Outlet />
        </Flex >
    </>

};