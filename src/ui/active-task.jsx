import StatusIcon from "../assets/ActiveIcon.svg?react"
import TaskMenuIcon from "../assets/taskMenuIcon.svg?react"
import { Flex } from "@mantine/core";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css"

export const ActiveTask = ({ description, title, priority, status, createdDate, imgPath }) => {
    return (
        <li className={styles.activeItemDesc}>
            <article>
                <StatusIcon
                    className={clsx({
                        [styles.notStartedIcon]: status === "Not Started",
                        [styles.startedIcon]: status === "In Progress"
                    })}
                />
                <button className={styles.activeMenu} >
                    <TaskMenuIcon />
                </button>
                <h3><a className={styles.itemTitle} href="#">{title}</a></h3>
                <Flex className={styles.activeDescCont} justify="center" align="center" gap="1rem">
                    <p className={styles.itemDesc}>{description}</p>
                    <img src={imgPath} alt="active task photo" />
                </Flex>
                <p className={styles.activeTextCont}>
                    <span>Priority: </span>
                    <span
                        className={clsx({
                            [styles.moderatePrior]: priority === "Moderate",
                            [styles.extremePrior]: priority === "Extreme"
                        })}
                    >{priority}</span>
                    <span>Status: </span>
                    <span
                        className={clsx({
                            [styles.notStarted]: status === "Not Started",
                            [styles.inProgress]: status === "In Progress"
                        })}>{status}</span>
                </p>
            </article>
        </li >
    )
}