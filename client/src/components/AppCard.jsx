import { useState } from 'react';

function buildSrcSet(url) {
  if (!url) return [''];
  const base = url.replace(/=s\d+(-c)?$/, '').replace(/=w\d+-h\d+.*$/, '');
  return [
    base + '=s256',
    base + '=s256-c',
    base + '=s128',
    base + '=s128-c',
    base + '=w128-h128',
    url,
  ];
}

export default function AppCard({ app, onClick, active }) {
  const cardClass = 'card' + (active ? ' card--active' : '');
  const srcSet = buildSrcSet(app.thumbnail);
  const [idx, setIdx] = useState(0);

  const handleError = () => {
    if (idx < srcSet.length - 1) setIdx(idx + 1);
  };

  return (
    <div className={cardClass} onClick={onClick}>
      <img src={srcSet[idx]} alt={app.title} loading='lazy' onError={handleError} />
      <div className='card-body'>
        <h4>{app.title}</h4>
        <div className='card-rating'>
          <span className='star'>★</span>
          <span>{app.rating}</span>
        </div>
        <p className='card-author'>{app.author}</p>
      </div>
    </div>
  );
}
