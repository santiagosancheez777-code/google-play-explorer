export default function AppCard({ app, onClick, active }) {
  const cardClass = 'card' + (active ? ' card--active' : '');

  return (
    <div className={cardClass} onClick={onClick}>
      <img src={app.thumbnail} alt={app.title} />
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
