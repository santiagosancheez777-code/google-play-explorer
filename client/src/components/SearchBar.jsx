import { useState } from 'react';

export default function SearchBar({ onSearch, initialValue }) {
  const [value, setValue] = useState(initialValue || '');

  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className='search-bar' onSubmit={submit}>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Busca una app... (ej: car, racing, puzzle)'
      />
      <button type='submit'>Buscar</button>
    </form>
  );
}
