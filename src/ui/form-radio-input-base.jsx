import { Radio, Group } from '@mantine/core';
import { useController } from "react-hook-form";
export const FormRadioInputBase = ({ control, name, rules, label, firstLabel, secondLabel, thirdLabel }) => {
    const { field, fieldState, formState } = useController({ name, control, rules });
    return <Radio.Group
        label={label}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
    >
        <Group>
            <Radio value={firstLabel} labelPosition="left" label={firstLabel} />
            <Radio value={secondLabel} labelPosition="left" label={secondLabel} />
            <Radio value={thirdLabel} labelPosition="left" label={thirdLabel} />
        </Group>
    </Radio.Group>

}