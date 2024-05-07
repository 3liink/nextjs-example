'use client'
import React from 'react'
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

const LoadingPage = () => {
    return (
        <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    )
}

export default LoadingPage