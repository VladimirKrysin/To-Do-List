import styles from "./vitalTasks.module.css";
import { useState, useEffect } from "react";
import { SectionHeader } from "../../ui/section-header";
import { Flex } from "@mantine/core";
import { useGetTasks } from "../../hooks/useGetTasks.js";
import { getVitalTasks } from "../../utils/getVitalsTasks.js";
import { TaskCard } from "../../ui/taskCard/taskCard.jsx";
import { renderTasksList } from "../../utils/renderTasksList.jsx";
import "../../App.css";
export const VitalTasks = () => {
  const tasks = useGetTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [vitalTasks, setVitalTasks] = useState([]);

  useEffect(() => {
    if (tasks.length) {
      setVitalTasks(getVitalTasks(tasks));
    }
  }, [tasks]);

  const handleTaskUpdate = (updatedTask) => {
    const updatedVitalTasks = vitalTasks.map((taskObj) =>
      taskObj.task._id === updatedTask._id
        ? { ...taskObj, task: { ...taskObj.task, ...updatedTask } }
        : taskObj
    );
    setVitalTasks(updatedVitalTasks);
    setSelectedTask(updatedTask);
  };

  useEffect(() => {
    if (vitalTasks.length && !selectedTask) {
      setSelectedTask(vitalTasks[0].task);
    }
  }, [vitalTasks, selectedTask]);

  return (
    <main className={styles.mainWrapper}>
      <Flex gap="1rem">
        <section className={styles.vitalCont}>
          <SectionHeader headerText="Важные задачи" page="vital" />
          <ul className={styles.tasksList}>
            {vitalTasks.map(({ task }) =>
              renderTasksList(task, setSelectedTask)
            )}
          </ul>
        </section>
        <article className={styles.taskCard}>
          {selectedTask && (
            <TaskCard task={selectedTask} onUpdate={handleTaskUpdate} />
          )}
        </article>
      </Flex>
    </main>
  );
};
