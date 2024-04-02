'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import  classnames  from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';


const NavBar = () => {

    return (
        <Container>
            <nav className='border-b mb-5 px-5 py-3'>
                <Flex justify='between' align='center'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><AiFillBug/></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </nav>
        </Container>
    )
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues/list'}
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map(link => (
                <li key={link.label}>
                    <Link 
                    className={classnames({
                        'nav-link': true,
                        '!text-zinc-900': link.href === currentPath
                    })}
                    href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading')
        return null;

    if (status === 'unauthenticated')
        return (<Link href='/api/auth/signin'>Login</Link>)
        
    return(
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback="?" radius='full' className='cursor-pointer'/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        { session!.user!.email!}
                    </DropdownMenu.Label> 
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar