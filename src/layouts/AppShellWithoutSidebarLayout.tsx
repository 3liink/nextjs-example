'use client'
import React from 'react'
import { AppShell } from '@mantine/core';
import NavbarLayout from '@/layouts/NavbarLayout';

const AppShellWithoutSidebarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <NavbarLayout />
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default AppShellWithoutSidebarLayout