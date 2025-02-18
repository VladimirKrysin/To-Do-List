
export const getVitalTasks = (tasks) => 
    tasks
      .filter((task) => task.priority === "Высокий")
      .toSorted((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .map((task, index) => ({
        task, index 
      }));