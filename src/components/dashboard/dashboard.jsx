import AddIcon from "../../assets/addTask.svg?react";
import ToDoIcon from "../../assets/ToDoIcon.svg?react";
import HandIcon from "../../assets/handWave.svg?react";
import TaskStatusIcon from "../../assets/TaskStatusIcon.svg?react";
import CompletedTaskIcon from "../../assets/CompletedTaskIcon.svg?react";
import { DonutChart } from "../../ui/donut-chart";
import styles from "./dashboard.module.css";
import TodayIcon from "../../assets/todayPointer.svg?react";
import { LoadingOverlay, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useGetTasks } from "../../hooks/useGetTasks.js";
import { renderTasksList } from "../../utils/renderTasksList.jsx";
import { isDateDiffIn3Days } from "../../utils/isDateDiffIn3Days.js";
import "../../App.css";
import { SectionHeader } from "../../ui/section-header";
import { NewTask } from "../../ui/new-task";

export const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const tasks = useGetTasks();
  return (
    <>
      <main className={styles.mainWrapper}>
        <section>
          <Flex align={"center"}>
            <h1 className={styles.pageTitle}>Здравствуйте, </h1>
            <HandIcon />
          </Flex>
        </section>
        <Flex className={styles.todosContainer}>
          <section className={styles.active}>
            <Flex className={styles.activeHeader} gap="12.5rem">
              <SectionHeader
                icon={<ToDoIcon />}
                headerText="To-Do"
                page="dashboard"
              />
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
              <Modal
                opened={opened}
                onClose={close}
                title="Добавить задачу"
                centered
                size="auto"
                styles={{
                  header: {
                    paddingTop: "1.5rem",
                    paddingLeft: "2.5rem",
                    paddingRight: "2rem",
                  },
                  title: {
                    fontWeight: "600",
                  },
                }}
              >
                <NewTask setLoading={setIsLoading} close={close} />
              </Modal>

              <Button
                variant="filled"
                color="#FF6767"
                leftSection={<AddIcon fill="#FFFFFF" />}
                radius="0.5rem"
                onClick={open}
              >
                Добавить задачу
              </Button>
            </Flex>
            <Flex className={styles.dateContainer} gap="0.75rem">
              <span className={styles.todayDate}>
                {" "}
                {new Intl.DateTimeFormat("en-GB", {
                  month: "long",
                  day: "2-digit",
                }).format(new Date())}
              </span>
              <Flex justify="center" align="center">
                <TodayIcon />
                <span className={styles.todayText}>Today</span>
              </Flex>
            </Flex>
            <ul className={styles.tasksList}>
              {tasks
                .filter(
                  (task) =>
                    task.status !== "Completed" &&
                    isDateDiffIn3Days(
                      new Date(new Date().setHours(0, 0, 0, 0)),
                      new Date(new Date(task.dueDate).setHours(0, 0, 0, 0))
                    )
                )
                .slice(0, 5)
                .toSorted((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((task, index) =>
                  renderTasksList(task, index, "dashboard")
                )}
            </ul>
          </section>
          <Flex direction="column" gap="1rem">
            <section className={styles.stats}>
              <SectionHeader
                icon={<TaskStatusIcon />}
                headerText="Task status"
                page="dashboard"
              />
              <Flex className={styles.chartsContainer} gap="2.5rem">
                <DonutChart
                  chartLabel={84}
                  payloadValue="Completed"
                  statusColor="#05A301"
                />
                <DonutChart
                  chartLabel={46}
                  payloadValue="In Progress"
                  statusColor="#0225FF"
                />
                <DonutChart
                  chartLabel={13}
                  payloadValue="Not Started"
                  statusColor="#F21E1E"
                />
              </Flex>
            </section>
            <section className={styles.completedCont}>
              <SectionHeader
                icon={<CompletedTaskIcon />}
                headerText="Completed Task"
                page="dashboard"
              />
              <ul className={styles.tasksList}>
                {tasks
                  .filter((task) => task.status === "Completed")
                  .map((task, index) =>
                    renderTasksList(task, index, "dashboard")
                  )}
              </ul>
            </section>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
