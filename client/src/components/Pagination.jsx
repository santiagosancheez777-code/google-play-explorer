export default function Pagination({ current, total, onChange }) {
  return (
    <div className='pagination'>
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className='btn-nav'
      >
        Anterior
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          className={page-btn }
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className='btn-nav'
      >
        Siguiente
      </button>
    </div>
  );
}
