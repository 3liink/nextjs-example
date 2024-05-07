'use client'
import React from 'react'
import { AppShell, Box, Flex, Image as MtImage, Loader, Button, UnstyledButton } from '@mantine/core';
import UserMenuComponent from '@/components/UserMenuComponent';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const NavbarLayout = () => {
    const { status } = useSession()
    return (
        <AppShell.Header>
            <Flex py={10} px="md" justify="space-between">
                <Box>
                    <UnstyledButton component='a' href='/'><MtImage src="/images/3liink-logo-brand-trans.png" component={Image} h={40} alt="User image" width={140} height={40} /></UnstyledButton>
                </Box>
                <Box>
                    {
                        status === "authenticated"
                        ? <UserMenuComponent />
                        : status === "loading"
                        ? <Loader color="blue" />
                        : <Button component={Link} href="/api/auth/signin?callbackUrl=%2Fadmin">Login</Button>
                    }                    
                </Box>
            </Flex>
        </AppShell.Header>
    )
}

export default NavbarLayout