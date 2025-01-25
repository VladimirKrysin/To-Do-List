import AddIcon from "../../assets/addTask.svg?react";
import ToDoIcon from "../../assets/ToDoIcon.svg?react";
import HandIcon from "../../assets/handWave.svg?react";
import TaskStatusIcon from "../../assets/TaskStatusIcon.svg?react";
import CompletedTaskIcon from "../../assets/CompletedTaskIcon.svg?react";
import { Task } from "../../ui/task";
import { DonutChart } from "../../ui/donut-chart"
import styles from "./dashboard.module.css"
import TodayIcon from "../../assets/todayPointer.svg?react"
import { Button, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import "../../App.css"
import { SectionHeader } from "../../ui/section-header";
import { NewTask } from "../../ui/new-task";


export const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch("http://localhost:3000/tasks");

            if (response.ok) {
                const data = await response.json();
                setTasks(data)
            }

        }
        fetchTasks()
    }, [])
    const delayedTask = tasks.find((element) => new Date(element.dueDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0));
    const formattedTasks = structuredClone(tasks).map((task) => {
        return {
            ...task,
            dueDate: new Date(task.dueDate).toLocaleString("ru", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
        }
    })
    return (
        <>
            <main className={styles.mainWrapper}>
                <section>
                    <Flex align={"center"}>
                        <h1 className={styles.pageTitle}>Welcome back, Sundar</h1>
                        <HandIcon />
                    </Flex>
                </section>
                <Flex className={styles.todosContainer}>
                    <section className={styles.active}>
                        <Flex className={styles.activeHeader} gap="17rem">
                            <SectionHeader
                                icon={<ToDoIcon />}
                                headerText="To-Do"
                            />
                            <Modal
                                opened={opened} onClose={close} title="Добавить задачу" centered size="auto"
                                styles={{
                                    header: {
                                        paddingTop: "1.5rem",
                                        paddingLeft: "2.5rem",
                                        paddingRight: "2rem",
                                    },
                                    title: {
                                        fontWeight: "600",
                                    },
                                }}

                            >
                                <NewTask />
                            </Modal>

                            <Button
                                variant="filled"
                                color="#FF6767"
                                leftSection={<AddIcon fill='#FFFFFF' />}
                                radius="0.5rem"
                                onClick={open}
                            >Добавить задачу</Button>
                        </Flex>
                        <Flex className={styles.dateContainer} gap="0.75rem">
                            <span className={styles.todayDate}> {new Intl.DateTimeFormat("en-GB", { month: "long", day: "2-digit" }).format(new Date())}</span>
                            <Flex justify="center" align="center">
                                <TodayIcon />
                                <span className={styles.todayText}>Today</span>
                            </Flex>
                        </Flex>
                        <ul className={styles.activeList}>
                            {formattedTasks.filter((task) => task.status !== "Completed").map((task, index) => {
                                if (task._id.toString() !== delayedTask._id.toString() || index === 0) {
                                    return <Task
                                        key={task._id.toString()}
                                        description={task.description}
                                        title={task.title}
                                        priority={task.priority}
                                        status={task.status}
                                        dueDate={task.dueDate}
                                        imgPath={task.imagePath}
                                    />
                                }
                                return (
                                    <div key={task._id.toString()}>
                                        <div className={styles.line}></div>
                                        <Task
                                            description={task.description}
                                            title={task.title}
                                            priority={task.priority}
                                            status={task.status}
                                            dueDate={task.dueDate}
                                            imgPath={task.imagePath}
                                        />
                                    </div>
                                )
                            })}
                        </ul>
                    </section>
                    <Flex direction="column" gap="1rem">
                        <section className={styles.stats}>
                            <SectionHeader
                                icon={<TaskStatusIcon />}
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
                            <SectionHeader
                                icon={<CompletedTaskIcon />}
                                headerText="Completed Task"
                            />
                            <ul className={styles.activeList}>
                                {formattedTasks.filter((task) => task.status === "Completed").map((task, index) => {
                                    if (task._id.toString() !== delayedTask._id.toString() || index === 0) {
                                        return <Task
                                            key={task._id.toString()}
                                            description={task.description}
                                            title={task.title}
                                            priority={task.priority}
                                            status={task.status}
                                            dueDate={task.dueDate}
                                            imgPath={task.imagePath}
                                        />
                                    }
                                    return (
                                        <div key={task._id.toString()}>
                                            <div className={styles.line}></div>
                                            <Task
                                                description={task.description}
                                                title={task.title}
                                                priority={task.priority}
                                                status={task.status}
                                                dueDate={task.dueDate}
                                                imgPath={task.imagePath}
                                            />
                                        </div>
                                    )
                                })}
                            </ul>
                        </section>
                    </Flex>
                </Flex >
            </main >
        </>

    )
}
