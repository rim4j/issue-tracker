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
  return (
    <nav className=' border-b mb-5 px-5 h-14 py-3  '>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];
  return (
    <ul className='flex space-x-6'>
      {links.map((item, i) => (
        <li key={i}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': item.href === currentPath,
            })}
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;

  if (status === 'unauthenticated')
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Login
      </Link>
    );

  if (status === 'authenticated')
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            size='2'
            radius='full'
            src={session.user!.image!}
            fallback='?'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
};

export default NavBar;
