import Image from 'next/image';
import React from 'react';

function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <section className='empty-state'>
      <div>
        <Image src={icon} alt='icon' width={44} height={44} />
      </div>
      <article>
        <h1>{title}</h1>
        <p>{description}</p>
      </article>
    </section>
  );
}

export default EmptyState;
