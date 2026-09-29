export default function AppDetail({ app }) {
  return (
    <div className='detail'>
      <img
        className='detail-hero'
        src={app.feature_image || app.thumbnail}
        alt={app.title}
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
