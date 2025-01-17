import { Button } from '@mantine/core';
import { useController } from 'react-hook-form';
import classes from "../components/dashboard/dashboard.module.css"
export const FormSubmitInputBase = ({ control, name }) => {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { errors }
    } = useController({
        name,
        control,
    });

    return (
        <Button
            variant="filled"
            color="#F24E1E"
            classNames={{
                root: classes.addTaskButton,
                inner: classes.addTaskButtonText,
            }}>Создать</Button >
    )

}