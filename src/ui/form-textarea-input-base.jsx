import { Textarea } from '@mantine/core';
import { useController } from "react-hook-form";
import styles from "../components/dashboard/dashboard.module.css"

export const FormTextAreaInputBase = ({ control, name, rules, label, placeholder }) => {
    const { field, fieldState, formState } = useController({ name, control, rules });
    return <Textarea
        classNames={{
            label: styles.label
        }}
        label={label}
        placeholder={placeholder}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        radius="md"
        autosize
        minRows={10}
    />

}