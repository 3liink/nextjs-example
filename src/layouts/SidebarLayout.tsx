import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconDashboard, IconListDetails } from '@tabler/icons-react';
import Link from 'next/link';

const SidbarLayout = () => {
    return (
        <>
            <NavLink
                component={Link}
                href="/admin"
                label="Dashboard"
                leftSection={<IconDashboard size="1rem" stroke={1.5} />}
            />
            <NavLink
                component={Link}
                href="/admin/management"
                label="Management"
                leftSection={<IconListDetails size="1rem" stroke={1.5} />}
            />
            <NavLink
                href="#required-for-focus"
                label="Active subtle"
                leftSection={<IconActivity size="1rem" stroke={1.5} />}
                rightSection={
                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                }
                variant="subtle"
                active
            />
            <NavLink
                href="#required-for-focus"
                label="Active light"
                leftSection={<IconActivity size="1rem" stroke={1.5} />}
                rightSection={
                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                }
                active
            />
            <NavLink
                href="#required-for-focus"
                label="Active filled"
                leftSection={<IconActivity size="1rem" stroke={1.5} />}
                rightSection={
                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                }
                variant="filled"
                active
            />
        </>
    );
}

export default SidbarLayout