import { Flex } from "@mantine/core";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css";

export const SectionHeader = ({ icon, headerText, page }) => {
  return (
    <Flex>
      {icon}
      <h3
        className={clsx(styles.sectionHeader, {
          [styles.headerColor]: page !== "dashboard",
        })}
      >
        {headerText}
      </h3>
    </Flex>
  );
};
