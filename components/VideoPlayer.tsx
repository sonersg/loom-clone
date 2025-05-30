import { createIframeLink } from '@/lib/utils';
import React from 'react';

function VideoPlayer({ videoId }: VideoPlayerProps) {
  return (
    <div className='video-player'>
      <iframe
        src={createIframeLink(videoId)}
        loading='lazy'
        title='video player'
        style={{ border: 0, zIndex: 11 }}
        allowFullScreen
        allow='accelerometer; gyroscope; encrypted-media; picture-in-picture'
      />
    </div>
  );
}

export default VideoPlayer;
