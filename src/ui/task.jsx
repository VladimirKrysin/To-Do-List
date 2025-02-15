import StatusIcon from "../assets/ActiveIcon.svg?react";
import TaskMenuIcon from "../assets/taskMenuIcon.svg?react";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css";
import { formatDueDate } from "../utils/formatTasks";
import { isOverDue } from "../utils/isOverDue";
import SVGIcon from "./Icon-base";
function TaskParams({ priority, status, dueDate }) {
  const overDue = isOverDue(dueDate);
  const formattedDueDate = formatDueDate(dueDate);
  if (status === "Completed") {
    return (
      <div className={styles.activeTextCont}>
        <span>Статус: </span>
        <span className={styles.completedColor}>{status}</span>
        <br />
        <span className={styles.completedTime}>Completed 2 days ago</span>
      </div>
    );
  }
  return (
    <div className={styles.activeTextCont}>
      <span>Приоритет: </span>
      <span
        className={clsx({
          [styles.moderatePrior]: priority === "Средний",
          [styles.extremePrior]: priority === "Высокий",
        })}
      >
        {priority}
      </span>
      <span>Статус: </span>
      <span
        className={clsx({
          [styles.notStarted]: status === "Not Started",
          [styles.inProgress]: status === "In Progress",
        })}
      >
        {status}
      </span>
      <div
        className={clsx(styles.dueDateCont, { [styles.overDueDate]: overDue })}
      >
        {overDue && (
          <SVGIcon
            name="clock"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-clock"
          />
        )}
        <span
          className={clsx(styles.createdDateText, {
            [styles.overDueDateText]: overDue,
          })}
        >
          Срок: {formattedDueDate}
        </span>
      </div>
    </div>
  );
}

export const Task = ({
  description,
  title,
  priority,
  status,
  dueDate,
  imgPath,
}) => {
  return (
    <li
      className={clsx(styles.itemCont, {
        [styles.completed]: status === "Completed",
      })}
    >
      <article>
        <StatusIcon
          className={clsx({
            [styles.notStartedIcon]: status === "Not Started",
            [styles.startedIcon]: status === "In Progress",
            [styles.completedIcon]: status === "Completed",
          })}
        />
        <button className={styles.activeMenu}>
          <TaskMenuIcon />
        </button>
        <h3 title={title}>
          <a className={styles.itemTitle} href="#">
            {title}
          </a>
        </h3>
        <p className={styles.itemDesc}>{description}</p>
        <TaskParams priority={priority} status={status} dueDate={dueDate} />
      </article>
    </li>
  );
};
