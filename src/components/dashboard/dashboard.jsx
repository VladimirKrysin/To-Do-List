import { Link, Outlet } from "react-router-dom"
import { TextInputBase } from "../../ui/text-input-base"
import SearchIcon from "../../assets/SearchICon.svg?react"
import Notification from "../../assets/Notifications.svg?react"
import Calendar from "../../assets/Calendar.svg?react";
import DashboardLogo from "../../assets/Dashboard.svg?react";
import AddTask from "../../assets/addTask.svg?react";
import ToDoIcon from "../../assets/ToDoIcon.svg?react";
import TaskStatusIcon from "../../assets/TaskStatusIcon.svg?react";
import { ActiveTask } from "../../ui/active-task";
import { DonutChart } from "../../ui/donut-chart"
import styles from "./dashboard.module.css"
import TodayIcon from "../../assets/todayPointer.svg?react"
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import "../../App.css"
import { SectionHeader } from "../../ui/section-header";


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
    const delayedTask = structuredClone(sortedActiveTasks).find((element) => new Date(element.createdDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0))
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
                                <SectionHeader
                                    Icon={<ToDoIcon />}
                                    headerText="To-Do"
                                />
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
                                {sortedActiveTasks.map((task) => {
                                    if (task.id !== delayedTask.id || task.id === 1) {
                                        return <ActiveTask
                                            key={task.id}
                                            description={task.description}
                                            title={task.title}
                                            priority={task.priority}
                                            status={task.status}
                                            createdDate={task.createdDate}
                                            imgPath={task.imagePath}
                                        />
                                    }
                                    return <>
                                        <div class={styles.line}></div>
                                        <ActiveTask
                                            key={task.id}
                                            description={task.description}
                                            title={task.title}
                                            priority={task.priority}
                                            status={task.status}
                                            createdDate={task.createdDate}
                                            imgPath={task.imagePath}
                                        />
                                    </>

                                })}
                            </ul>
                        </section>
                        <Flex direction="column" gap="1rem">
                            <section className={styles.stats}>
                                <SectionHeader
                                    Icon={<TaskStatusIcon />}
                                    headerText="Task status"
                                />
                                <Flex className={styles.chartsContainer} gap="2.5rem">
                                    <DonutChart
                                        chartLabel={84}
                                        payloadValue="Completed"
                                        statusColor="#05A301"
                                    />
                                    <DonutChart
                                        chartLabel={46}
                                        payloadValue="In Progress"
                                        statusColor="#0225FF"
                                    />
                                    <DonutChart
                                        chartLabel={13}
                                        payloadValue="Not Started"
                                        statusColor="#F21E1E"
                                    />
                                </Flex>
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