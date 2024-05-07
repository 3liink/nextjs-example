import React from 'react'
import { Box, LoadingOverlay, Overlay } from '@mantine/core';

const LoadingPage = () => {
    return (
        <Box className="w-full h-screen relative">
            <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </Box>
    )
}

export default LoadingPage