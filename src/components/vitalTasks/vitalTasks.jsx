import styles from "./vitalTasks.module.css";
import { SectionHeader } from "../../ui/section-header";
import { Flex } from "@mantine/core";
import { useGetTasks } from "../../hooks/useGetTasks.js";
import { formatTasks } from "../../utils/formatTasks.js";
import { renderTasksList } from "../../utils/renderTasksList.jsx";
import { getDelayedTask } from "../../utils/getDelayedTask.js";
import "../../App.css";
export const VitalTasks = () => {
  const tasks = useGetTasks();
  const delayedTask = getDelayedTask(tasks);
  const formattedTasks = formatTasks(tasks);
  return (
    <main className={styles.mainWrapper}>
      <Flex>
        <section className={styles.vitalCont}>
          <SectionHeader headerText="Важные задачи" />
          <ul className={styles.tasksList}>
            {formattedTasks
              .filter((task) => task.priority === "Высокий")
              .map((task, index) => renderTasksList(delayedTask, task, index))}
          </ul>
        </section>
      </Flex>
    </main>
  );
};
