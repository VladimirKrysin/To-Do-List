import styles from "./vitalTasks.module.css";
import { SectionHeader } from "../../ui/section-header";
import { Flex } from "@mantine/core";
import { useGetTasks } from "../../hooks/useGetTasks.js";
import { getDelayedTask } from "../../utils/getDelayedTask.js";
import { getVitalTasks } from "../../utils/getVitalsTasks.js";
import "../../App.css";
export const VitalTasks = () => {
  const tasks = useGetTasks();
  const delayedTask = getDelayedTask(tasks);
  const vitalTasks = getVitalTasks(tasks, delayedTask);
  return (
    <main className={styles.mainWrapper}>
      <Flex>
        <section className={styles.vitalCont}>
          <SectionHeader headerText="Важные задачи" page="vital" />
          <ul className={styles.tasksList}>{vitalTasks}</ul>
        </section>
        <article className={styles.taskCard}></article>
      </Flex>
    </main>
  );
};
