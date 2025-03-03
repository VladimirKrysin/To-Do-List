import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./kanban.css";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import SVGIcon from "../../ui/Icon-base";

export default function ColumnContainer({
  column,
  updateColumn,
  deleteColumn,
  deleteTask,
  createTask,
  updateTask,
  tasks,
}) {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
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
    <li ref={setNodeRef} style={style} className={`column ${isDragging ? 'dragging' : ''}`}>
      <div className={`columnContent ${isDragging ? 'draggingColumn' : ''}`}>
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditMode(true)}
          className="columTitle"
        >
          {!editMode && column.title}
          {editMode && (
            <input
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
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
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
            className="deleteColumnButton"
          >
            <SVGIcon
              name="trash"
              size={18}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
            />
          </button>
        </div>
        <div className="columContent">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </SortableContext>
        </div>
        <button
          onClick={() => {
            createTask(column.id);
          }}
          className="addTaskButton"
        >
          Add task
        </button>
      </div>
    </li>
  );
}
