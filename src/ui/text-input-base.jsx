import { TextInput } from '@mantine/core';

export const TextInputBase = ({ placeholder = "placeholder", leftSection = null }) => {
    return (
        <TextInput styles={{
            wrapper: { width: '35rem', height: '3.75rem' },
            input: { height: '3.75rem', fontSize: '1rem', color: '#999999', borderColor: '#565454', borderRadius: '0.6rem' },

        }} placeholder={placeholder} leftSection={leftSection} leftSectionWidth="4rem" />
    )
}
