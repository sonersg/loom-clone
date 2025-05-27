'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const user = {};

function Navbar() {
  const router = useRouter();

  return (
    <header className='navbar'>
      <nav>
        <Link href='/'>
          <Image
            src='/assets/icons/logo.svg'
            alt='logo'
            width={32}
            height={32}
          />
          <h1>ScreenCast</h1>
        </Link>

        {user && (
          <figure>
            <button onClick={() => router.push('/profile/id')}>
              <Image
                className='rounded-full aspect-square'
                src='/assets/images/dummy.jpg'
                alt='default pic'
                width={36}
                height={36}
              />
            </button>
            <button>
              <Image
                className='cursor-pointer rotate-180'
                src='/assets/icons/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
