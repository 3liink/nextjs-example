'use client'
import React from 'react'
import { Menu, Button, Text, rem, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconArrowsLeftRight,
    IconLogout,
    IconListDetails,
    IconDashboard,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserMenuComponent = () => {
    const { data: session } = useSession()
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar component="button" variant="outline" src="/images/3liink-logo-icon-only-200.png" alt="user image" />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label fw="bold">{session?.user.name}</Menu.Label>
                <Menu.Label c="grape">{session?.user.role}</Menu.Label>
                <Menu.Divider />
                <Menu.Item leftSection={<IconDashboard style={{ width: rem(14), height: rem(14) }} />} component={Link} href="/admin">
                    Dashboard page
                </Menu.Item>
                <Menu.Item leftSection={<IconListDetails style={{ width: rem(14), height: rem(14) }} />} component={Link} href="/admin/management">
                    Management page
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => signOut()}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default UserMenuComponent