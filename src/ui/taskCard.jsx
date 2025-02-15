import { Flex } from "@mantine/core";
import styles from "../components/dashboard/dashboard.module.css";
import clsx from "clsx";
import { isOverDue } from "../utils/isOverDue";

export const taskCard = (task) => {
  const overDue = isOverDue(dueDate);
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
      </section>
    </div>
  );
};
