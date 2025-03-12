import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { formatDueDate } from "../../utils/formatTasks";
import { isOverDue } from "../../utils/isOverDue";
import SVGIcon from "../../ui/Icon-base";
import "./kanban.css";
export default function TaskCard({ column, task, updateTask, deleteTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.number}-task-${task.number}`,
    data: {
      type: "Task",
      task,
      column,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="draggingTaskCard" />;
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="taskCard"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(column.number, task.number);
          }}
          className="deleteTaskButton"
        >
          <SVGIcon
            name="trash"
            size={18}
            fill="none"
            stroke="currentcolor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
          />
        </button>
      )}

      <h3 title={task.title}>
        <a className="taskTitle" href="#">
          {task.title}
        </a>
      </h3>
      <p className="taskDesc">{task.description}</p>
      <TaskParams priority={task.priority} dueDate={task.dueDate} />
    </div>
  );
}

function TaskParams({ priority, dueDate }) {
  const overDue = isOverDue(dueDate);
  const formattedDueDate = formatDueDate(dueDate);
  return (
    <div className="activeTextCont">
      <span>Приоритет: </span>
      <span
        className={clsx({
          moderatePrior: priority === "Средний",
          extremePrior: priority === "Высокий",
        })}
      >
        {priority}
      </span>
      <div className={clsx("dueDateCont", { overDueDate: overDue })}>
        {overDue && (
          <SVGIcon
            name="clock"
            stroke="currentColor"
            strokeWidth="2"
            size={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-clock"
          />
        )}
        <span
          className={clsx("createdDateText", {
            overDueDateText: overDue,
          })}
        >
          Срок: {formattedDueDate}
        </span>
      </div>
    </div>
  );
}
