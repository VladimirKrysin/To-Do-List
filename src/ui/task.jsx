import StatusIcon from "../assets/ActiveIcon.svg?react"
import TaskMenuIcon from "../assets/taskMenuIcon.svg?react"
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css"

function TaskParams({ priority, status, dueDate }) {
    if (status === "Completed") {
        return <div className={styles.activeTextCont}>
            <span>Статус: </span>
            <span className={styles.completedColor}>{status}</span><br />
            <span className={styles.completedTime}>Completed 2 days ago</span>
        </div>
    }
    return <div className={styles.activeTextCont}>
        <span>Приоритет: </span>
        <span
            className={clsx({
                [styles.moderatePrior]: priority === "Средний",
                [styles.extremePrior]: priority === "Высокий"
            })}
        >{priority}</span>
        <span>Статус: </span>
        <span
            className={clsx({
                [styles.notStarted]: status === "Not Started",
                [styles.inProgress]: status === "In Progress"
            })}>{status}</span>
        <span className={styles.createdDateText}>Срок: {dueDate}</span>
    </div>

}

export const Task = ({ description, title, priority, status, dueDate, imgPath }) => {
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
                <p className={styles.itemDesc}>{description}</p>
                <TaskParams
                    priority={priority}
                    status={status}
                    dueDate={dueDate}
                />
            </article>
        </li >
    )
}