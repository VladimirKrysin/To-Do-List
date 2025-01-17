import { DateInput } from '@mantine/dates';
import { useController } from "react-hook-form";

export const FormDateInputBase = ({ control, name, rules, label, rightSection }) => {
    const { field, fieldState, formState } = useController({ name, control, rules });
    return <DateInput
        styles={{
            root: { marginBottom: "1rem" },
            label: { fontFamily: 'Montserrat Variable', fontWeight: 600 }
        }}
        valueFormat="YYYY/MM/DD"
        label={label}
        rightSection={rightSection}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
    />


}