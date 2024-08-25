import { TextInput } from '@mantine/core';
import { useController } from "react-hook-form";

export const FormTextInputBase = ({ control, name, rules, label }) => {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { errors }
    } = useController({
        name,
        control,
        rules
    });

    return (
        <TextInput
            styles={{
                root: { fontFamily: 'Montserrat Variable' },
                label: { fontWeight: 600 }
            }}
            label={label}
            size="sm"
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            ref={field.ref}
        />
    )
}
