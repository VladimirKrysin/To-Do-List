import { useState } from "react";
import StatusIcon from "../assets/ActiveIcon.svg?react"
import TaskMenuIcon from "../assets/taskMenuIcon.svg?react"
import TaskPhoto from "../assets/taskPhoto.png";
import { Flex } from "@mantine/core";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css"

export const ActiveTask = () => {
    const [taskStatus, setTaskStatus] = useState("Not Started")
    return (
        <li className={styles.activeItemDesc}>
            <article>
                <StatusIcon
                    className={clsx({
                        [styles.notStartedIcon]: taskStatus === "Not Started",
                        [styles.startedIcon]: taskStatus === "In progress"
                    })}
                />
                <button className={styles.activeMenu} >
                    <TaskMenuIcon />
                </button>
                <h3><a className={styles.itemTitle} href="#">Attend Nischal’s Birthday Party</a></h3>
                <Flex className={styles.activeDescCont} justify="center" align="center" gap="1rem">
                    <p className={styles.itemDesc}>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....</p>
                    <img src={TaskPhoto} alt="active task photo" />
                </Flex>
                <p className={styles.activeTextCont}>
                    <span>Priority: </span>
                    <span className={styles.priorType}>Moderate </span>
                    <span className={styles.status}>Status: </span>
                    <span>{taskStatus}</span>
                </p>
            </article>
        </li>
    )
}