'use client'
import React from 'react'
import { AppShell, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavbarLayout from './NavbarLayout';

const TemplateLayout = ({ children }: { children: React.ReactNode }) => {
    const [opened] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <NavbarLayout />
            <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default TemplateLayout