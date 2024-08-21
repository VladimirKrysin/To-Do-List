import { Flex } from "@mantine/core";
import styles from "../components/dashboard/dashboard.module.css"

export const SectionHeader = ({ icon, headerText }) => {
    return <Flex>
        {icon}
        <h3 className={styles.sectionHeader}>{headerText}</h3>
    </Flex>
}