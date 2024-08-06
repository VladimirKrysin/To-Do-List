import { Link, Outlet } from "react-router-dom"
import { TextInputBase } from "../../ui/text-input-base"
import SearchIcon from "../../assets/SearchICon.svg?react"
import Notification from "../../assets/Notifications.svg?react"
import Calendar from "../../assets/Calendar.svg?react";
import DashboardLogo from "../../assets/Dashboard.svg?react";
import AddTask from "../../assets/addTask.svg?react";
import ActiveTasks from "../../assets/ActiveTasks.svg?react"
import ActiveIcon from "../../assets/ActiveIcon.svg?react"
import taskPhoto from "../../assets/taskPhoto.png";
import styles from "./dashboard.module.css"
import { Flex, px } from "@mantine/core";
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
                                    <ActiveTasks />
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
                                <li className={styles.activeItemDesc}>
                                    <article>
                                        <Flex gap="1rem">
                                            <ActiveIcon />
                                            <h3><a className={styles.itemTitle} href="#">Attend Nischal’s Birthday Party</a></h3>
                                        </Flex>
                                        <Flex className={styles.activeDescCont} justify="center" align="center" gap="1rem">
                                            <p className={styles.itemDesc}>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</p>
                                            <img src={taskPhoto} alt="active task photo" />
                                        </Flex>
                                        <p className={styles.activeTextCont}>
                                            <span>Priority: </span>
                                            <span className={styles.priorType}>Moderate </span>
                                            <span className={styles.status}>Status: </span>
                                            <span>Not Started</span>
                                        </p>
                                    </article>
                                </li>
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