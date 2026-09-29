import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import AppCard from './components/AppCard';
import AppDetail from './components/AppDetail';
import Pagination from './components/Pagination';

const PAGE_SIZE = 9;

export default function App() {
  const [query, setQuery] = useState('car');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState({});

  const fetchApps = async (q, p = 1, token = null) => {
    setLoading(true);
    try {
      const url = new URL('/api/apps', window.location.origin);
      url.searchParams.set('q', q);
      url.searchParams.set('page', p);
      if (token) url.searchParams.set('next_page_token', token);

      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
      if (data.next_page_token)
        setTokens((prev) => ({ ...prev, [p + 1]: data.next_page_token }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTokens({});
    setPage(1);
    setSelected(null);
    fetchApps(query, 1);
  }, [query]);

  useEffect(() => {
    if (items.length && !selected) setSelected(items[0]);
  }, [items]);

  const totalPages = Math.min(Object.keys(tokens).length + 1, 10);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePageChange = (n) => {
    setPage(n);
    if (!tokens[n]) return;
    fetchApps(query, n, tokens[n]);
  };

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-logo'>▶</div>
        <h1><strong>Googoo Play Store</strong></h1>
        <p>SerpAPI · React</p>
      </header>

      <SearchBar onSearch={setQuery} initialValue={query} />

      <main className='layout'>
        <section className='detail-panel'>
          {selected && <AppDetail app={selected} />}
        </section>

        <section className='gallery-panel'>
          {loading ? (
            <p className='loading'>Cargando</p>
          ) : (
            <div className='grid'>
              {pageItems.map((app, i) => (
                <AppCard
                  key={app.product_id + '-' + i}
                  app={app}
                  onClick={() => setSelected(app)}
                  active={selected?.product_id === app.product_id}
                />
              ))}
            </div>
          )}

          <Pagination current={page} total={totalPages} onChange={handlePageChange} />
        </section>
      </main>
    </div>
  );
}
