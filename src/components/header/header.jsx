import { TextInputBase } from "../../ui/text-input-base"
import SearchIcon from "../../assets/SearchICon.svg?react"
import Notification from "../../assets/Notifications.svg?react"
import Calendar from "../../assets/Calendar.svg?react";
import styles from "./header.module.css"
import { Flex } from "@mantine/core";

export const Header = ({ headerLogo }) => {
    return (
        <header className={styles.header}>
            {headerLogo}
            <Flex className={styles.cont}>
                <TextInputBase
                    placeholder="Search your task here..."
                    rightSection={<SearchIcon />}
                    radius={"0.5rem"}
                />
                <Flex align="center" gap={8}>
                    <Notification />
                    <Calendar />
                </Flex>
            </Flex>
        </header>

    )
}