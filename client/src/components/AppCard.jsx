import { useState } from 'react';

function buildSrcSet(url) {
  if (!url) return [''];
  const base = url.replace(/=s\d+(-c)?$/, '');
  return [
    base + '=s512',
    base + '=s512-c',
    base + '=s256',
    base + '=s128',
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
      <img
        src={srcSet[idx]}
        alt={app.title}
        loading='lazy'
        onError={handleError}
      />
      <div className='card-body'>
        <h4>{app.title}</h4>
        <p className='meta'>
          <span>Rating: {app.rating}</span>
          <span>Descargas: {app.downloads}</span>
        </p>
        <p className='author'>{app.author}</p>
      </div>
    </div>
  );
}
