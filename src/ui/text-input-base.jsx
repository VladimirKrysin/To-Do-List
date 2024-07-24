import { TextInput } from '@mantine/core';

export const TextInputBase = ({ placeholder = "placeholder", leftSection = null }) => {
    return (
        <TextInput styles={{
            input: { color: '#999999', borderColor: '#565454' },

        }} size='md' placeholder={placeholder} leftSection={leftSection} />
    )
}
