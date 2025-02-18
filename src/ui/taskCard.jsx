import { Flex } from "@mantine/core";
import styles from "../components/dashboard/dashboard.module.css";
import clsx from "clsx";
import { formatDueDate } from "../utils/formatTasks";
import { isOverDue } from "../utils/isOverDue";
import SVGIcon from "./Icon-base";

export const TaskCard = ({ task }) => {
  const overDue = isOverDue(task.dueDate);
  const formattedDueDate = formatDueDate(task.dueDate);
  return (
    <div>
      <h3>{task.title}</h3>;
      <Flex>
        <span>Приоритет: </span>
        <span className={styles.extremePrior}>{task.priority}</span>
      </Flex>
      ;
      <Flex>
        <span>Cтатус: </span>
        <span
          className={clsx({
            [styles.notStarted]: task.status === "Not Started",
            [styles.inProgress]: task.status === "In Progress",
          })}
        >
          {task.status}
        </span>
      </Flex>
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
      <p>{task.description}</p>
      <section>
        <h3>Вложения</h3>
        <div>
          {task.filepath.map((path, index) => {
            const fileName = path.split("/").pop();
            return (
              <div key={index}>
                <a href={path} download={fileName}>
                  {fileName}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
