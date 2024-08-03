import { TextInput } from '@mantine/core';

export const TextInputBase = ({ placeholder = "placeholder", leftSection = null, value, onChange, rightSection, radius }) => {
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
            value={value}
            size='md'
            placeholder={placeholder}
            leftSection={leftSection}
            rightSection={rightSection}
            onChange={onChange}
            radius={radius}
        />
    )
}
