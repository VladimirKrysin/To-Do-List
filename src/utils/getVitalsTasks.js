import { renderTasksList } from "./renderTasksList";

export const getVitalTasks = (tasks, delayedTask) => 
    tasks
        .filter((task) => task.priority === "Высокий")
        .toSorted((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map((task, index) => renderTasksList(delayedTask, task, index));