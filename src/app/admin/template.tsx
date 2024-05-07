'use client'
import React from 'react'
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavbarLayout from '@/layouts/NavbarLayout';
import SidbarLayout from '@/layouts/SidebarLayout';

const AdminTemplate = ({ children }: { children: React.ReactNode }) => {
    const [opened] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <NavbarLayout />
            <AppShell.Navbar p="md">
                Module
                <SidbarLayout />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default AdminTemplate