import { Flex } from "@mantine/core";
import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "../filePond.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import styles from "./taskCard.module.css";
import clsx from "clsx";
import { formatDueDate } from "../../utils/formatTasks";
import { isOverDue } from "../../utils/isOverDue";
import SVGIcon from "../Icon-base";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const TaskCard = ({ task, onUpdate }) => {
  const [isFilePondVisible, setFilePondVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
    setFiles([]);
  }, [task]);

  const handleAddAttachment = () => {
    setFilePondVisible(true);
  };

  const handleFileUploadComplete = (response) => {
    const uploadedPath = JSON.parse(response);
    console.log("Uploaded path:", uploadedPath);
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      filepath: prevTask.filepath
        ? [...prevTask.filepath, uploadedPath]
        : [uploadedPath],
    }));
  };

  const overDue = isOverDue(task.dueDate);
  const formattedDueDate = formatDueDate(task.dueDate);

  const handleUpdateTask = async () => {
    console.log(updatedTask);

    try {
      const taskToUpdate = {
        ...updatedTask,
        uploadFile: updatedTask.filepath,
      };
      const response = await fetch(
        `http://localhost:3000/tasks/update/${updatedTask._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskToUpdate),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Задача обновлена!");
        if (onUpdate) onUpdate(updatedTask);
      } else {
        alert("Ошибка при обновлении задачи: " + result.message);
      }
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      alert("Произошла ошибка при обновлении задачи.");
    }
  };

  return (
    <div>
      <Flex className={styles.taskCont}>
        <h2 className={styles.taskTitle}>{task.title}</h2>
        <Flex className={styles.priorityCont}>
          <span>Приоритет: </span>
          <span className={styles.extremePrior}>{task.priority}</span>
        </Flex>
        <Flex className={styles.statusCont}>
          <span>Cтатус: </span>
          <span
            className={clsx({
              [styles.notStarted]: task.status === "Not Started",
              [styles.inProgress]: task.status === "In Progress",
            })}
          >
            {task.status}
          </span>
        </Flex>

        <div
          className={clsx(styles.dueDateCont, {
            [styles.overDueDate]: overDue,
          })}
        >
          {overDue && (
            <SVGIcon
              name="clock"
              stroke="currentColor"
              size={18}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-clock"
            />
          )}
          <span
            className={clsx(styles.createdDateText, {
              [styles.overDueDateText]: overDue,
            })}
          >
            Срок: {formattedDueDate}
          </span>
        </div>
        <Flex className={styles.taskContent}>
          <Flex className={styles.descCont}>
            <Flex gap="0.5rem" align="center">
              <SVGIcon
                name="taskDescription"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-file-description"
              />
              <h3>Описание</h3>
            </Flex>
            <section>
              <p>{task.description}</p>
            </section>
          </Flex>
          <section>
            <Flex gap="0.5rem">
              <SVGIcon
                name="attachments"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-paperclip"
                viewBox="0 0 24 24"
              />
              <h3>Вложения</h3>
            </Flex>
            <div>
              {task.filepath.map((path, index) => {
                const fileName = path.split("/").pop().split("-")[0];
                return (
                  <div key={index}>
                    <a
                      className={styles.fileLink}
                      href={path}
                      download={fileName}
                    >
                      {fileName}
                    </a>
                  </div>
                );
              })}
              <button onClick={handleAddAttachment}>Добавить</button>
              {isFilePondVisible && (
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={3}
                  server={{
                    process: {
                      url: "http://localhost:3000/files/upload",
                      onload: handleFileUploadComplete,
                    },
                  }}
                  name="files"
                  labelIdle='Перетащите файл сюда или <span class="filepond--label-action">Выберите файл</span>'
                />
              )}
            </div>
          </section>
        </Flex>
      </Flex>
      <button onClick={handleUpdateTask}>Сохранить изменения</button>{" "}
    </div>
  );
};
