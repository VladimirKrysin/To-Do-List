import { Button } from '@mantine/core';
import classes from "../components/dashboard/dashboard.module.css"
export const FormSubmitInputBase = () => {
    return (
        <Button
            type="submit"
            variant="filled"
            color="#F24E1E"
            classNames={{
                root: classes.addTaskButton,
                inner: classes.addTaskButtonText,
            }}>Создать</Button >
    )

}