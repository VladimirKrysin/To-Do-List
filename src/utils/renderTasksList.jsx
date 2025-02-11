import { Task } from "../ui/task.jsx";

export const renderTasksList = (delayedTask, task, index, page) => {
  if (
    task._id.toString() !== delayedTask._id.toString() ||
    index === 0 ||
    page !== "dashboard" ||
    task.status === "completed"
  ) {
    return (
      <Task
        key={task._id.toString()}
        description={task.description}
        title={task.title}
        priority={task.priority}
        status={task.status}
        dueDate={task.dueDate}
        imgPath={task.imagePath}
      />
    );
  }
  return (
    <div key={task._id.toString()}>
      <div className={styles.line}></div>
      <Task
        description={task.description}
        title={task.title}
        priority={task.priority}
        status={task.status}
        dueDate={task.dueDate}
        imgPath={task.imagePath}
      />
    </div>
  );
};
