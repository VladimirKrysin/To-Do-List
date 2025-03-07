import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./kanban.css";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import SVGIcon from "../../ui/Icon-base";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Task } from "../../ui/task";
import { ActionIcon } from "@mantine/core";
import { NewTask } from "../../ui/new-task";

export default function ColumnContainer({
  column,
  updateColumn,
  deleteColumn,
  deleteTask,
  createTask,
  updateTask,
  tasks,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const tasksNumbers = useMemo(() => {
    return tasks.map((task) => `task - ${task.number}`);
  }, [tasks]);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `col - ${column.number}`,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // if (isDragging) {
  //   return (
  //     <div ref={setNodeRef} style={style} className="draggingColumn"></div>
  //   );
  // }
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`column ${isDragging ? "dragging" : ""}`}
    >
      <div className={`columnContent ${isDragging ? "draggingColumn" : ""}`}>
        <div className="columnHeader">
          <div
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
            className="columnTitle"
          >
            {!editMode && column.name}
            {editMode && (
              <input
                value={column.name}
                onChange={(e) => updateColumn(column.number, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
          <div className="actionIconsCont">
            <ActionIcon
              onClick={open}
              // onClick={() => {
              //   createTask(column.id);
              // }}
              variant="light"
              color="#5030E5"
            >
              <SVGIcon
                name="addTask"
                size={12}
                viewBox="0 0 13 12"
                fill="none"
              />
            </ActionIcon>

            <button
              onClick={() => {
                deleteColumn(column.number);
              }}
              className="deleteColumnButton"
            >
              <SVGIcon
                name="trash"
                size={24}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
              />
            </button>
          </div>
        </div>
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
        <div className="columnTasks">
          <SortableContext items={tasksNumbers}>
            {tasks.map((task) => {
              return (
                <TaskCard
                  key={`task - ${task.number}`}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              );
            })}
          </SortableContext>
        </div>
      </div>
    </li>
  );
}
