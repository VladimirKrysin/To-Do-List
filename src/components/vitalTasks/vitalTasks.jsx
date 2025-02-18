import styles from "./vitalTasks.module.css";
import { useState, useEffect } from "react";
import { SectionHeader } from "../../ui/section-header";
import { Flex } from "@mantine/core";
import { useGetTasks } from "../../hooks/useGetTasks.js";
import { getDelayedTask } from "../../utils/getDelayedTask.js";
import { getVitalTasks } from "../../utils/getVitalsTasks.js";
import { TaskCard } from "../../ui/taskCard.jsx";
import { renderTasksList } from "../../utils/renderTasksList.jsx";
import "../../App.css";
export const VitalTasks = () => {
  const tasks = useGetTasks();
  const delayedTask = getDelayedTask(tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const vitalTasks = getVitalTasks(tasks);

  useEffect(() => {
    if (vitalTasks.length && !selectedTask) {
      setSelectedTask(vitalTasks[0].task);
    }
  }, [vitalTasks, selectedTask]);

  return (
    <main className={styles.mainWrapper}>
      <Flex>
        <section className={styles.vitalCont}>
          <SectionHeader headerText="Важные задачи" page="vital" />
          <ul className={styles.tasksList}>
            {vitalTasks.map(({ task, index }) =>
              renderTasksList(delayedTask, task, index, setSelectedTask)
            )}
          </ul>
        </section>
        <article className={styles.taskCard}>
          {selectedTask && <TaskCard task={selectedTask} />}
        </article>
      </Flex>
    </main>
  );
};
