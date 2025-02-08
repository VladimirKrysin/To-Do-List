import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardLogo from "../../assets/Dashboard.svg?react";
// import { Icon } from '../../ui/icon-base.jsx';
import SVGIcon from "../../ui/Icon-base.jsx";
import { MenuItem } from "../../ui/menu-item.jsx";
import styles from "./root.module.css";
import { Flex } from "@mantine/core";
import { Header } from "../header/header.jsx";

export const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = {
    dashboard: {
      text: "",
      icon: "",
      link: "",
    },
    vitalTasks: {},
  };

  useEffect(() => {
    if (location.pathname === "/") navigate("dashboard");
  }, [location.pathname]);

  return (
    <>
      <Header headerLogo={<DashboardLogo />} />
      <Flex className={styles.pageContainer}>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            <MenuItem
              className={styles.navigationItem}
              text="Дашборд"
              icon={<SVGIcon name="dashboard" />}
            />
            <MenuItem
              className={styles.navigationItem}
              text="Срочные задачи"
              route="vital-tasks"
              icon={<SVGIcon name="vital" />}
            />
            <MenuItem
              className={styles.navigationItem}
              text="Задачи"
              icon={<SVGIcon name="myTask" />}
            />
            <MenuItem
              className={styles.navigationItem}
              text="Настройки"
              icon={<SVGIcon name="settings" />}
            />
          </ul>
        </nav>
        <Outlet />
      </Flex>
    </>
  );
};
