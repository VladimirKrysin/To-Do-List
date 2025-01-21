import { Flex } from "@mantine/core";
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
    const { control, register, handleSubmit, formState: { errors } } = useForm(
        { defaultValues: { title: "", date: "", priority: "", description: "" } });
    const onSubmit = () => console.log('test');
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.addNewTaskContainer}>
                <FormTextInputBase control={control} name="title" rules={{ required: true }} label="Title" />
                <FormDateInputBase control={control} name="date" rules={{ required: true }} label="Date" rightSection={<IconCalendarMonth size={16} />} />
                <FormRadioInputBase control={control} name="extreme" rules={{ required: true }} label="Priority" firstLabel="Extreme" secondLabel="Moderate" thirdLabel="Low" />
                <FormTextAreaInputBase control={control} name="taskDescription" rules={{ required: true }} label={"Task Description"} placeholder={"Start writing here....."} />
                <FormUploadFileInputBase control={control} name="uploadFile" />
            </div>
            <FormSubmitInputBase control={control} name="submitButton" />
        </form >
    );
}
