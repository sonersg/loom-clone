'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  async function handleSignin() {
    return await authClient.signIn.social({ provider: 'google' });
  }

  return (
    <main className='sign-in'>
      <aside className='testimonial'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo.svg'
            alt='logo'
            width={32}
            height={32}
          />
          <h1>ScreenCast</h1>
        </Link>

        <div className='description'>
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src='/assets/icons/star.svg'
                  alt='logo'
                  width={20}
                  height={20}
                />
              ))}
            </figure>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
              amet minima exercitationem ipsa dignissimos excepturi consequatur,
              incidunt, pariatur nostrum veniam, voluptas voluptate.
            </p>

            <article>
              <Image
                src='/assets/images/jason.png'
                alt='jason'
                width={64}
                height={64}
                className='rounded-full'
              />
              <div>
                <h2>Soner Güçlü</h2>
                <p>sof dev</p>
              </div>
            </article>
          </section>
        </div>

        <p>Screencast {new Date().getFullYear()} &#169; </p>
      </aside>

      <aside className='google-sign-in'>
        <section>
          <Link href='/'>
            <Image
              src='/assets/icons/logo.svg'
              alt='logo'
              width={40}
              height={40}
            />
            <h1>ScreenCast</h1>
          </Link>

          <p>
            Record and share ur very first <span>ScreenCast Video</span> in no
            time!
          </p>

          <button onClick={handleSignin}>
            <Image
              src='/assets/icons/google.svg'
              alt='google'
              width={22}
              height={22}
            />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>

      <div className='overlay' />
    </main>
  );
};

export default page;
