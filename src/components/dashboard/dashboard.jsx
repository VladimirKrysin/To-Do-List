import { Link, Outlet } from "react-router-dom"
import { TextInputBase } from "../../ui/text-input-base"
import SearchIcon from "../../assets/SearchICon.svg?react"
import Notification from "../../assets/Notifications.svg?react"
import Calendar from "../../assets/Calendar.svg?react";
import DashboardLogo from "../../assets/Dashboard.svg?react";
import styles from "./dashboard.module.css"
import { Flex, Container } from "@mantine/core";
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
                            <div>
                                <h2>To-Do</h2>
                                <button>Add task</button>
                            </div>
                            <ul>
                                <li>
                                    <a>
                                        <article>
                                            <h3>Attend Nischal’s Birthday Party</h3>
                                            <p>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</p>
                                            <span>Priority:<span>Moderate</span></span>
                                            <span>Status:<span>Not Started</span></span>
                                        </article>
                                    </a>
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