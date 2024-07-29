import { PasswordInput } from '@mantine/core';

export const PasswordInputBase = ({ placeholder, leftSection, value, onChange }) => {
    return (
        <PasswordInput
            styles={{
                innerInput: {
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat Variable'
                },
                input: {
                    color: "#212427",
                    borderColor: '#565454',
                }
            }}
            value={value}
            onChange={onChange}
            size="md"
            placeholder={placeholder}
            leftSection={leftSection}
        />
    )
}