import styles from "../../src/components/root/root.module.css"
import { Flex } from "@mantine/core";

export const MenuItem = ({ icon, text }) =>
    <li>
        <Flex className={styles.dashboardLinkWrapper}>
            {icon}
            <span className={styles.dashboardText}>{text}</span>
        </Flex>
    </li>
