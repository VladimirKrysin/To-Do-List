import { TextInput } from '@mantine/core';
import { useController } from "react-hook-form";

export const FormInputBase = ({ control, name }) => {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { errors }
    } = useController({
        name,
        control,
        rules: { required: true },
    });

    return (
        <TextInput
            styles={{
                input: {
                    color: "#212427",
                    borderColor: '#565454',
                    fontSize: '0.75rem',
                    fontFamily: 'Montserrat Variable'
                }
            }}
            size='md'
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            ref={field.ref}
        />
    )
}
