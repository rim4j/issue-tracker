import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa6';

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/' },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <FaBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((item, i) => (
          <Link
            key={i}
            className='text-zinc-500 hover:text-zinc-800 transition-colors'
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;