import { Flex } from "@mantine/core";
import styles from "../components/dashboard/dashboard.module.css"

export const SectionHeader = ({ Icon, headerText }) => {
    return <Flex>
        {Icon}
        <h3 className={styles.sectionHeader}>{headerText}</h3>
    </Flex>
}