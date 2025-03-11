import { useMemo, useState, useEffect } from "react";
import "./kanban.css";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { ActionIcon, Button } from "@mantine/core";
import SVGIcon from "../../ui/Icon-base";
import { useGetData } from "../../hooks/useGetData";
import clsx from "clsx";

export default function KanbanBoard() {
  const data = useGetData();
  const [columns, setColumns] = useState([]);
  const columnsNumbers = useMemo(
    () => columns.map((col) => `col - ${col.number}`),
    [columns]
  );
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    if (data.length > 0) {
      const columnsData = data.map((col) => ({
        number: col.number,
        name: col.name,
        tasks: col.tasks,
      }));
      setColumns(columnsData);
    }
  }, [data]);

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeType = active?.data?.current?.type;
    const overType = over?.data?.current?.type;

    if (!activeType || !overType) return;

    if (activeType === "Column") {
      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => `col - ${col.number}` === activeId
        );
        const overColumnIndex = columns.findIndex(
          (col) => `col - ${col.number}` === overId
        );

        if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }

    if (activeType === "Task") {
      setColumns((prevColumns) => {
        const newColumns = structuredClone(prevColumns);

        //колонка и  индекс активной задачи
        let activeColIndex = -1;
        let activeTaskIndex = -1;
        newColumns.forEach((col, colIndex) => {
          const index = col.tasks.findIndex(
            (t) => `task - ${t.number}` === active.id
          );
          if (index !== -1) {
            activeColIndex = colIndex;
            activeTaskIndex = index;
          }
        });
        if (activeColIndex === -1 || activeTaskIndex === -1) return newColumns;

        // Определяем over
        let targetColIndex = -1;
        let targetTaskIndex = -1;

        if (overType === "Task") {
          newColumns.forEach((col, colIndex) => {
            const index = col.tasks.findIndex(
              (t) => `task - ${t.number}` === over.id
            );
            if (index !== -1) {
              targetColIndex = colIndex;
              targetTaskIndex = index;
            }
          });
        } else if (overType === "Column") {
          targetColIndex = newColumns.findIndex(
            (col) => `col - ${col.number}` === over.id
          );
          targetTaskIndex = newColumns[targetColIndex]?.tasks?.length || 0;
        }

        if (targetColIndex === -1 || targetTaskIndex === -1) return newColumns;

        if (activeColIndex === targetColIndex) {
          if (activeTaskIndex !== targetTaskIndex) {
            newColumns[activeColIndex].tasks = arrayMove(
              newColumns[activeColIndex].tasks,
              activeTaskIndex,
              targetTaskIndex
            );
          }
        } else {
          const [movedTask] = newColumns[activeColIndex].tasks.splice(
            activeTaskIndex,
            1
          );
          newColumns[targetColIndex].tasks.splice(
            targetTaskIndex,
            0,
            movedTask
          );
        }

        return newColumns;
      });
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setColumns((columns) => {
        const newColumns = structuredClone(columns);

        //Колонка и индекс активной задачи
        let activeColumnIndex = -1;
        let activeTaskIndex = -1;
        newColumns.forEach((col, colIndex) => {
          const index = col.tasks.findIndex(
            (t) => `task - ${t.number}` === activeId
          );
          if (index !== -1) {
            activeColumnIndex = colIndex;
            activeTaskIndex = index;
          }
        });

        // Колонка и индекс over задачи
        let overColumnIndex = -1;
        let overTaskIndex = -1;
        newColumns.forEach((col, colIndex) => {
          const index = col.tasks.findIndex(
            (t) => `task - ${t.number}` === overId
          );
          if (index !== -1) {
            overColumnIndex = colIndex;
            overTaskIndex = index;
          }
        });

        // Если не нашли хотя бы одну из задач
        if (activeColumnIndex === -1 || overColumnIndex === -1) {
          return newColumns;
        }

        if (activeColumnIndex === overColumnIndex) {
          // Если задачи в одной колонке
          newColumns[activeColumnIndex].tasks = arrayMove(
            newColumns[activeColumnIndex].tasks,
            activeTaskIndex,
            overTaskIndex
          );
        } else {
          // Если задачи в разных колонках — удаляем задачу из одной и вставляем в другую
          const [movedTask] = newColumns[activeColumnIndex].tasks.splice(
            activeTaskIndex,
            1
          );
          newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, movedTask);
        }

        return newColumns;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverAColumn) {
      setColumns((columns) => {
        const newColumns = JSON.parse(JSON.stringify(columns));

        // Поиск активной задачи
        let activeColumnIndex = -1;
        let activeTaskIndex = -1;
        newColumns.forEach((col, colIndex) => {
          const index = col.tasks.findIndex(
            (t) => `task - ${t.number}` === activeId
          );
          if (index !== -1) {
            activeColumnIndex = colIndex;
            activeTaskIndex = index;
          }
        });
        if (activeColumnIndex === -1) return newColumns;

        // Over колонка
        const targetColumnIndex = newColumns.findIndex(
          (col) => `col - ${col.number}` === overId
        );
        if (targetColumnIndex === -1) return newColumns;

        // Удаление задачи из active колонки
        const [movedTask] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1
        );
        newColumns[targetColumnIndex].tasks.push(movedTask);

        return newColumns;
      });
    }
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      number: generateId(),
      name: `Column ${columns.length + 1}`,
      tasks: [],
    };
    setColumns([...columns, columnToAdd]);
  }

  function updateColumn(number, name) {
    const newColumns = columns.map((col) => {
      if (col.number !== number) return col;
      return { ...col, name };
    });
    setColumns(newColumns);
  }

  function deleteColumn(number) {
    const newColumns = columns.filter((column) => column.number !== number);
    setColumns(newColumns);
  }

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteTask(columnNumber, taskNumber) {
    const newColumns = columns.map((column) => {
      if (column.number === columnNumber) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.number !== taskNumber),
        };
      }
      return column;
    });

    setColumns(newColumns);
  }
  return (
    <main className="pageCont">
      <section>
        <h1 className="pageTitle">Панель управления</h1>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="kanbanWrapper">
            <div className="columnWrapper">
              <SortableContext items={columnsNumbers}>
                <ul className="columnsList">
                  {columns.map((column) => (
                    <ColumnContainer
                      key={`col - ${column.number}`}
                      column={column}
                      updateColumn={updateColumn}
                      deleteColumn={deleteColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      tasks={column.tasks}
                    />
                  ))}
                </ul>
              </SortableContext>
            </div>
            <ActionIcon
              onClick={() => {
                createNewColumn();
                setIsColumn(true);
              }}
              variant="transparent"
              size={32}
              className={clsx({ addColumnIcon: columns.length })}
            >
              <SVGIcon
                name="addColumn"
                width="31"
                height="24"
                viewBox="0 0 31 24"
                fill="none"
              />
            </ActionIcon>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  tasks={activeColumn.tasks}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </section>
    </main>
  );
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}
