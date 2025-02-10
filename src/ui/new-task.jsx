import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Flex } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { IconCircleX } from "@tabler/icons-react";
import styles from "../components/dashboard/dashboard.module.css";
import { FormTextInputBase } from "./form-text-input-base.jsx";
import { FormDateInputBase } from "./form-date-input-base.jsx";
import { FormRadioInputBase } from "./form-radio-input-base.jsx";
import { IconCalendarMonth } from "@tabler/icons-react";
import { FormTextAreaInputBase } from "./form-textarea-input-base.jsx";
import { FormSubmitInputBase } from "./form-submit-input-base.jsx";
import { FormUploadFileInputBase } from "./form-upload-file-input-base.jsx";
import { showNotification } from "@mantine/notifications";

export const NewTask = ({ setLoading, close }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      date: "",
      priority: "",
      taskDescription: "",
      uploadFile: "",
      status: "Not Started",
    },
  });

  const iconSuccess = <IconCheck />;
  const iconError = <IconCircleX />;
  const onSubmit = async (data) => {
    setLoading(true);

    const postData = {
      ...data,
      uploadFile: uploadFilePath,
    };
    console.log(postData);

    const response = await fetch("http://localhost:3000/tasks/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setTimeout(async () => {
      setLoading(false);
      if (response.ok) {
        const responseResult = await response.json();
        showNotification({
          message: responseResult.message,
          color: "green",
          icon: iconSuccess,
        });
        close();
      } else {
        const responseResult = await response.json();
        showNotification({
          message: responseResult.message,
          color: "red",
          icon: iconError,
        });
      }
    }, 1000);
  };

  const [uploadFilePath, setUploadFilePath] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.addNewTaskContainer}>
        <FormTextInputBase control={control} name="title" label="Название" />
        <FormDateInputBase
          control={control}
          name="date"
          label="Срок"
          rightSection={<IconCalendarMonth size={16} />}
        />
        <FormRadioInputBase
          control={control}
          name="priority"
          label="Приоритет"
          firstLabel="Высокий"
          secondLabel="Средний"
          thirdLabel="Низкий"
        />
        <FormTextAreaInputBase
          control={control}
          name="taskDescription"
          label={"Описание"}
          placeholder={"Добавьте описание....."}
        />
        <FormUploadFileInputBase
          control={control}
          name="uploadFile"
          setUploadFilePath={(filePath) => setUploadFilePath(filePath)}
        />
      </div>
      <FormSubmitInputBase />
      {successMessage && (
        <Alert
          styles={{
            root: { marginTop: "1rem" },
          }}
          variant="light"
          color="green"
          icon={iconSuccess}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          styles={{
            root: { marginTop: "1rem" },
          }}
          variant="light"
          color="red"
          icon={iconError}
        >
          {errorMessage}
        </Alert>
      )}
    </form>
  );
};
