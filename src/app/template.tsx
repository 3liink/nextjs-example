import { Box } from '@mantine/core'
import React from 'react'

const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box className="relative">{children}</Box>
    )
}

export default template