import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import '../../styles/history-page/SearchBar.css'
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ recentHomework }) => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const filteredCards = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();
    const startsWith = recentHomework.filter((card) =>
      card.title.toLowerCase().startsWith(q)
    );
    const includes = recentHomework.filter((card) =>
      !card.title.toLowerCase().startsWith(q) &&
      card.title.toLowerCase().includes(q)
    )
    return [...startsWith, ...includes]
  }, [recentHomework, query])

  return (
    <div className="search-bar">
      <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder='Search your homework history...' />
      <Search />
      { query !== '' && <div className="search-rslt">
        {filteredCards.map(card =>
          <div onClick={() => navigate(`/history/${card.id}`)} className='search-rslt-card' key={card.id}>
            <div className="search-rslt-title">
              {card.title}
            </div>
            </div>
        )}
      </div>}
    </div>
  )
}