import { Flex } from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../components/dashboard/dashboard.module.css"
import { FormTextInputBase } from "./form-text-input-base.jsx";
import { FormDateInputBase } from "./form-date-input-base.jsx";
import { FormRadioInputBase } from "./form-radio-input-base.jsx";
import { IconCalendarMonth } from '@tabler/icons-react';
import { FormTextAreaInputBase } from "./form-textarea-input-base.jsx";
import { FormSubmitInputBase } from "./form-submit-input-base.jsx";
import { FormUploadFileInputBase } from "./form-upload-file-input-base.jsx";
export const NewTask = () => {
    const { control, handleSubmit, formState: { errors } } = useForm(
        { defaultValues: { title: "", date: "", priority: "", taskDescription: "", uploadFile: "", status: "Not started" } });
    const onSubmit = async (data) => {
        console.log(uploadFilePath)
        const postData = {
            ...data,
            uploadFile: uploadFilePath
        }
        console.log(postData);

        const response = await fetch("http://localhost:3000/tasks/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const content = await response.json();
        console.log(content);

    };
    const [uploadFilePath, setUploadFilePath] = useState("");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.addNewTaskContainer}>
                <FormTextInputBase control={control} name="title" label="Title" />
                <FormDateInputBase control={control} name="date" label="Date" rightSection={<IconCalendarMonth size={16} />} />
                <FormRadioInputBase control={control} name="priority" label="Priority" firstLabel="Extreme" secondLabel="Moderate" thirdLabel="Low" />
                <FormTextAreaInputBase control={control} name="taskDescription" label={"Task Description"} placeholder={"Start writing here....."} />
                <FormUploadFileInputBase control={control} name="uploadFile" setUploadFilePath={(filePath) => setUploadFilePath(filePath)} />
            </div>
            <FormSubmitInputBase />
        </form >
    );
}
