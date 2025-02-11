import { useEffect, useState } from "react";

export function useGetTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:3000/tasks");

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    }
    fetchTasks();
  }, []);

  return tasks;
}
