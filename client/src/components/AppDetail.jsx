import { useState, useEffect } from 'react';

function buildHeroSrcSet(app) {
  const list = [];
  if (app.feature_image) {
    const base = app.feature_image.replace(/=w\d+-h\d+.*$/, '');
    list.push(base + '=w512-h288');
    list.push(base + '=w416-h235');
    list.push(app.feature_image);
  }
  if (app.thumbnail) {
    const base = app.thumbnail.replace(/=s\d+(-c)?$/, '').replace(/=w\d+-h\d+.*$/, '');
    list.push(base + '=s256');
    list.push(base + '=s256-c');
    list.push(base + '=s128');
    list.push(app.thumbnail);
  }
  return list.length ? list : [''];
}

export default function AppDetail({ app }) {
  const srcSet = buildHeroSrcSet(app);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [app]);

  const handleError = () => {
    if (idx < srcSet.length - 1) setIdx(idx + 1);
  };

  return (
    <div className='detail'>
      <div className='detail-top'>
        <img
          className='detail-icon'
          src={srcSet[idx]}
          alt={app.title}
          onError={handleError}
        />
        <div className='detail-info'>
          <h2>{app.title}</h2>
          <p className='developer'>{app.author}</p>
          <span className='category'>{app.category}</span>
        </div>
      </div>

      <div className='detail-stats'>
        <div className='stat'>
          <span className='stat-value'>
            <span className='star'>★</span> {app.rating}
          </span>
          <span className='stat-label'>rating</span>
        </div>
        <div className='divider' />
        <div className='stat'>
          <span className='stat-value'>{app.downloads}</span>
          <span className='stat-label'>descargas</span>
        </div>
      </div>

      <a href={app.link} target='_blank' rel='noreferrer' className='install-btn'>
        Ver en Google Play
      </a>

      <h3>Acerca de esta app</h3>
      <p className='detail-desc'>{app.description}</p>

      <div className='detail-actions'>
        {app.video && (
          <a href={app.video} target='_blank' rel='noreferrer' className='btn-secondary'>
            ▶ Ver video
          </a>
        )}
      </div>
    </div>
  );
}
