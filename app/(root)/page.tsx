import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { dummyCards } from '@/constants';
import React from 'react';

const page = () => {
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

      <section className='video-grid'>
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
};

export default page;
