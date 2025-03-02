import { Task } from "../ui/task.jsx";
import clsx from "clsx";
import styles from "../components/dashboard/dashboard.module.css";
export const renderTasksList = (task, setSelectedTask) => {
  const handleClick = () => {
    setSelectedTask(task);
  };

  return (
    <li
      key={task._id.toString()}
      className={clsx(styles.itemCont, {
        [styles.completed]: task.status === "Completed",
      })}
      onClick={handleClick}
    >
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
