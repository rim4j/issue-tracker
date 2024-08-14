'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa6';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
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
      <Box>
        {status === 'authenticated' && (
          <Link href='api/auth/signout'>Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href='api/auth/signin'>Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
