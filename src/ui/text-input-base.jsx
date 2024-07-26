import { TextInput } from '@mantine/core';

export const TextInputBase = ({ placeholder = "placeholder", leftSection = null, value }) => {
    return (
        <TextInput styles={{
            input: { color: "#212427", borderColor: '#565454', fontSize: '0.875rem', fontFamily: 'Montserrat Variable' }

        }} size='md' placeholder={placeholder} leftSection={leftSection} />
    )
}
