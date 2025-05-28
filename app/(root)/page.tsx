import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { dummyCards } from '@/constants';
import { getAllVideos } from '@/lib/actions/video';
import React from 'react';

const page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams;
  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page) || 1
  );

  return (
    <main className='wrapper page'>
      <Header title='All Videos' subHeader='Public Library' />
      {/* 
      <VideoCard
        id='1'
        title='soner sg'
        thumbnail='/assets/samples/thumbnail (1).png'
        createdAt={new Date()}
        userImg='/assets/images/jason.png'
        username='Soner'
        views={10}
        visibility='public'
        duration={156}
      /> */}

      {/* <section className='video-grid'>
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section> */}

      {videos?.length > 0 ? (
        <section className='video-grid'>
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              {...video}
              thumbnail={video.thumbnailUrl}
              userImg={user?.image || ''}
              username={user?.name || 'Guest'}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon='/assets/icons/video.svg'
          title='No videos found'
          description='Try adjusting your search'
        />
      )}
    </main>
  );
};

export default page;
