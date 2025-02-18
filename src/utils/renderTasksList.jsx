import { Task } from "../ui/task.jsx";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css";
export const renderTasksList = (
  delayedTask,
  task,
  index,
  setSelectedTask,
  page
) => {
  const handleClick = () => {
    setSelectedTask(task);
  };

  const isDelayed =
    task._id.toString() === delayedTask._id.toString() &&
    index !== 0 &&
    page === "dashboard" &&
    task.status !== "completed";

  return (
    <li
      key={task._id.toString()}
      className={clsx(styles.itemCont, {
        [styles.completed]: task.status === "Completed",
      })}
      onClick={handleClick}
    >
      {isDelayed && <div className={styles.line}></div>}
      <Task
        description={task.description}
        title={task.title}
        priority={task.priority}
        status={task.status}
        dueDate={task.dueDate}
        imgPath={task.imagePath}
      />
    </li>
  );
};
