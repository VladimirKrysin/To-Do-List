import { Link, Outlet } from "react-router-dom"
import { TextInputBase } from "../../ui/text-input-base"
import SearchIcon from "../../assets/SearchICon.svg?react"
import Notification from "../../assets/Notifications.svg?react"
import Calendar from "../../assets/Calendar.svg?react";
import DashboardLogo from "../../assets/Dashboard.svg?react";
import AddTask from "../../assets/addTask.svg?react";
import ToDoIcon from "../../assets/ToDoIcon.svg?react";
import { ActiveTask } from "../../ui/active-task";
import styles from "./dashboard.module.css"
import "../../App.css"
import { Flex } from "@mantine/core";
export const Dashboard = () => {

    return (
        <>
            <header className={styles.header}>
                <DashboardLogo />
                <Flex className={styles.cont}>
                    <TextInputBase
                        placeholder="Search your task here..."
                        rightSection={<SearchIcon />}
                        radius={"0.5rem"}
                    />
                    <Flex className={styles.innerCont} gap={8}>
                        <Notification />
                        <Calendar />
                    </Flex>
                </Flex>
            </header>
            <Flex className={styles.pageContainer}>
                <nav className={styles.navigation}>
                </nav>
                <main className={styles.mainWrapper}>
                    <div className={styles.todosContainer}>
                        <section className={styles.active}>
                            <Flex className={styles.activeHeader} gap="15rem">
                                <Flex gap="0.5rem" justify="center" align="center">
                                    <ToDoIcon />
                                    <h4 className={styles.activeTitle}>To-Do</h4>
                                </Flex>
                                <Flex justify="center" align="center">
                                    <a href="#">
                                        <div>
                                            <AddTask />
                                            <span className={styles.addText}>Add task</span>
                                        </div>
                                    </a>
                                </Flex>
                            </Flex>
                            <ul className={styles.activeList}>
                                <ActiveTask />
                                <ActiveTask />
                                <div class={styles.line}></div>
                                <ActiveTask />
                            </ul>
                        </section>
                        <section className={styles.stats}>
                            <h3>Task status</h3>
                        </section>
                        <section className={styles.completed}>
                            <h3>Completed Task</h3>
                        </section>
                    </div>
                </main>
            </Flex >
            <Outlet />

        </>

    )
}