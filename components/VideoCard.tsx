'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function VideoCard({
  id,
  title,
  thumbnail,
  createdAt,
  userImg,
  username,
  views,
  visibility,
  duration,
}: VideoCardProps) {
  return (
    <Link href={`/video/${id}`} className='video-card'>
      <Image
        src={thumbnail}
        alt='thumnail'
        width={290}
        height={160}
        className='thumbnail'
      />

      <article>
        <div>
          <figure>
            <Image
              src={userImg || '/assets/images/dummy.jpg'}
              alt='avatar'
              width={34}
              height={34}
              className='rounded-full aspect-square'
            />
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>

          <aside>
            <Image
              src='/assets/icons/eye.svg'
              alt='views'
              width={18}
              height={18}
            />
            <span>{views}</span>
          </aside>
        </div>

        <h2>
          {title} -{' '}
          {createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </h2>
      </article>

      <button onClick={() => {}} className='copy-btn'>
        <Image src='/assets/icons/link.svg' alt='copy' width={18} height={18} />
      </button>
      {duration && (
        <div className='duration'>{Math.ceil(duration / 60)}min</div>
      )}
    </Link>
  );
}

export default VideoCard;
