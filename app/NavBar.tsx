'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa6';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];
  return (
    <nav className=' border-b mb-5 px-5 h-14 py-3  '>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <FaBug />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((item, i) => (
                <li key={i}>
                  <Link
                    className={classnames({
                      'text-zinc-900': item.href === currentPath,
                      'text-zinc-500': item.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true,
                    })}
                    // className='text-zinc-500 hover:text-zinc-800 transition-colors'
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    size='2'
                    radius='full'
                    src={session.user?.image!}
                    fallback='?'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='api/auth/signout'>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href='api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
