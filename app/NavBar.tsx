'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import  classnames  from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';

const NavBar = () => {

    const { status, data: session } = useSession();
    console.log(session);
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues/list'}
    ]



    return (
        <Container>
            <nav className='border-b mb-5 px-5 py-3'>
                <Flex justify='between' align='center'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><AiFillBug/></Link>
                        <ul className='flex space-x-6'>
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link 
                                    className={classnames({
                                        'text-zinc-900': link.href === currentPath,
                                        'text-zinc-500': link.href !== currentPath,
                                        'hover:text-zinc-800 transition-colors': true
                                    })}
                                    href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        { status === 'authenticated' && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user!.image!} fallback="?" radius='full' className='cursor-pointer'/>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        { session.user!.email!}
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href='/api/auth/signout'>Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            // <Link href='/api/auth/signout'>Log out</Link>
                        )}
                        { status === 'unauthenticated' && (<Link href='/api/auth/signin'>Login</Link>)}
                    </Box>
                </Flex>
            </nav>
        </Container>
    )
}

export default NavBar