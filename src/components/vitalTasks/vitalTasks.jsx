import styles from "./vitalTasks.module.css";
import { SectionHeader } from "../../ui/section-header";
import { Flex } from "@mantine/core";
import { useGetTask } from "../../hooks/useFetchTasks.js";
import { formatTasks } from "../../utils/formatTasks.js";
import "../../App.css";
export const VitalTasks = () => {
  return (
    <main className={styles.mainWrapper}>
      <Flex>
        <section className={styles.vitalCont}>
          <SectionHeader headerText="Срочные задачи" />
          <ul></ul>
        </section>
      </Flex>
    </main>
  );
};
