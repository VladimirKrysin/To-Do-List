export const formatTasks = (tasks) => 
    structuredClone(tasks).map((task) => {
        return {
          ...task,
          dueDate: new Date(task.dueDate).toLocaleString("ru", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };
      });
