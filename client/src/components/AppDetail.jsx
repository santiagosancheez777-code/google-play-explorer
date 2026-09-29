import { useState, useEffect } from 'react';

function buildHeroSrcSet(app) {
  const list = [];
  if (app.feature_image) {
    const base = app.feature_image.replace(/=w\d+-h\d+.*$/, '');
    list.push(base + '=w800-h450');
    list.push(base + '=w512-h288');
    list.push(app.feature_image);
  }
  if (app.thumbnail) {
    const base = app.thumbnail.replace(/=s\d+(-c)?$/, '');
    list.push(base + '=s512');
    list.push(base + '=s512-c');
    list.push(base + '=s256');
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
      <img
        className='detail-hero'
        src={srcSet[idx]}
        alt={app.title}
        onError={handleError}
      />
      <div className='detail-header'>
        <h2>{app.title}</h2>
        <span className='category'>{app.category}</span>
      </div>
      <div className='detail-stats'>
        <div><strong>Rating:</strong> {app.rating}</div>
        <div><strong>Descargas:</strong> {app.downloads}</div>
        <div><strong>Autor:</strong> {app.author}</div>
      </div>
      <p className='detail-desc'>{app.description}</p>
      <div className='detail-actions'>
        <a href={app.link} target='_blank' rel='noreferrer' className='btn-primary'>
          Ver en Google Play
        </a>
        {app.video && (
          <a href={app.video} target='_blank' rel='noreferrer' className='btn-secondary'>
            Ver video
          </a>
        )}
      </div>
    </div>
  );
}
