import { Radio, Group } from '@mantine/core';
import { useController } from "react-hook-form";
import FormPriorityIcon from "../assets/FormPriorityIcon.svg?react";
import styles from "../components/dashboard/dashboard.module.css"
import clsx from "clsx";
export const FormRadioInputBase = ({ control, name, rules, label, firstLabel, secondLabel, thirdLabel }) => {
    const { field, fieldState, formState } = useController({ name, control, rules });
    return <Radio.Group
        classNames={{
            label: styles.label,
        }}
        style={{ marginBottom: "1rem" }}
        label={label}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
    >
        <Group>
            <FormPriorityIcon
                className={clsx({
                    [styles.extremePriorityIcon]: firstLabel === "Высокий",
                    [styles.moderatePriorityIcon]: firstLabel === "Средний",
                    [styles.lowPriorityIcon]: firstLabel === "Низкий"
                })}
            />
            <Radio
                classNames={{
                    label: styles.priorityTextColor,
                }}
                value={firstLabel} labelPosition="left" label={firstLabel} />
            <FormPriorityIcon
                className={clsx({
                    [styles.extremePriorityIcon]: secondLabel === "Высокий",
                    [styles.moderatePriorityIcon]: secondLabel === "Средний",
                    [styles.lowPriorityIcon]: secondLabel === "Низкий"
                })
                }
            />
            <Radio
                classNames={{
                    label: styles.priorityTextColor,
                }} value={secondLabel} labelPosition="left" label={secondLabel} />
            <FormPriorityIcon
                className={clsx({
                    [styles.extremePriorityIcon]: thirdLabel === "Высокий",
                    [styles.moderatePriorityIcon]: thirdLabel === "Средний",
                    [styles.lowPriorityIcon]: thirdLabel === "Низкий"
                })}
            />
            <Radio
                classNames={{
                    label: styles.priorityTextColor,
                }}
                value={thirdLabel} labelPosition="left" label={thirdLabel} />
        </Group>
    </Radio.Group>

}