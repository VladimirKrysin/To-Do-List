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
import TodayIcon from "../../assets/todayPointer.svg?react"
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import "../../App.css"


export const Dashboard = () => {
    const [activeTasks, setActiveTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch("http://localhost:3000/tasks");

            if (response.ok) {
                const data = await response.json();
                setActiveTasks(data)
            }

        }
        fetchTasks()
    }, [])
    const sortedActiveTasks = activeTasks.toSorted((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
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
                    <Flex className={styles.todosContainer}>
                        <section className={styles.active}>
                            <Flex className={styles.activeHeader} gap="18rem">
                                <Flex gap="0.5rem" justify="center" align="center">
                                    <ToDoIcon />
                                    <h4 className={styles.activeTitle}>To-Do</h4>
                                </Flex>
                                <a href="#" >
                                    <AddTask />
                                    <span className={styles.addText}>Add task</span>
                                </a>
                            </Flex>
                            <Flex className={styles.dateContainer} gap="0.75rem">
                                <span className={styles.todayDate}> {new Intl.DateTimeFormat("en-GB", { month: "long", day: "2-digit" }).format(new Date())}</span>
                                <Flex justify="center" align="center">
                                    <TodayIcon />
                                    <span className={styles.todayText}>Today</span>
                                </Flex>
                            </Flex>
                            <ul className={styles.activeList}>
                                {activeTasks.toSorted((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).map((task) => {
                                    return <ActiveTask
                                        key={task.id}
                                        description={task.description}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        createdDate={task.createdDate}
                                        imgPath={task.imagePath}
                                    />
                                })}
                                {/* {activeTasks.map((task) => {
                                    return <ActiveTask
                                        key={task.id}
                                        description={task.description}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        createdDate={task.createdDate}
                                        imgPath={task.imagePath}
                                    />
                                })} */}
                            </ul>
                        </section>
                        <Flex direction="column" gap="1rem">
                            <section className={styles.stats}>
                                <h3>Task status</h3>
                            </section>
                            <section className={styles.completed}>
                                <h3>Completed Task</h3>
                            </section>
                        </Flex>
                    </Flex>
                </main >
            </Flex >
            <Outlet />
        </>

    )
}