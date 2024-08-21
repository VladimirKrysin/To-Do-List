import StatusIcon from "../assets/ActiveIcon.svg?react"
import TaskMenuIcon from "../assets/taskMenuIcon.svg?react"
import { Flex } from "@mantine/core";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css"

function TaskParams({ priority, status, createdDate }) {
    if (status === "Completed") {
        return <div className={styles.activeTextCont}>
            <span>Status: </span>
            <span className={styles.completedColor}>{status}</span><br />
            <span className={styles.completedTime}>Completed 2 days ago</span>
        </div>
    }
    return <div className={styles.activeTextCont}>
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
        <span className={styles.createdDateText}>Created on: {createdDate}</span>
    </div>

}

export const Task = ({ description, title, priority, status, createdDate, imgPath }) => {
    return (
        <li className={clsx({
            [styles.activeItemCont]: status === "Not Started" || status === "In Progress",
            [styles.completedItemCont]: status === "Completed"
        })}>
            <article>
                <StatusIcon
                    className={clsx({
                        [styles.notStartedIcon]: status === "Not Started",
                        [styles.startedIcon]: status === "In Progress",
                        [styles.completedIcon]: status === "Completed"
                    })}
                />
                <button className={styles.activeMenu} >
                    <TaskMenuIcon />
                </button>
                <h3 title={title}><a className={styles.itemTitle} href="#">{title}</a></h3>
                <Flex className={styles.activeDescCont} justify="center" align="center" gap="1rem">
                    <p className={styles.itemDesc}>{description}</p>
                    <img src={imgPath} alt="task photo" />
                </Flex>
                <TaskParams
                    priority={priority}
                    status={status}
                    createdDate={createdDate}
                />
            </article>
        </li >
    )
}