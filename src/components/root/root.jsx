import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardLogo from "../../assets/Dashboard.svg?react";
import SVGIcon from "../../ui/Icon-base.jsx";
import { MenuItem } from "../../ui/menu-item.jsx";
import styles from "./root.module.css";
import { Flex } from "@mantine/core";
import { Header } from "../header/header.jsx";

export const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      text: "Дашборд",
      icon: <SVGIcon name="dashboard" />,
      link: "dashboard",
    },
    {
      text: "Важные задачи",
      icon: <SVGIcon name="vital" />,
      link: "vital-tasks",
    },
    {
      text: "Задачи",
      icon: <SVGIcon name="myTask" />,
      link: "tasks",
    },
    {
      text: "Настройки",
      icon: <SVGIcon name="settings" />,
      link: "info",
    },
  ];

  useEffect(() => {
    if (location.pathname === "/") navigate("dashboard");
  }, [location.pathname]);

  return (
    <>
      <Header headerLogo={<DashboardLogo />} />
      <Flex className={styles.pageContainer}>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            {menu.map((item) => (
              <MenuItem
                key={item.link}
                text={item.text}
                icon={item.icon}
                link={item.link}
              />
            ))}
          </ul>
        </nav>
        <Outlet />
      </Flex>
    </>
  );
};
