import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/history-page/SearchBar.css'
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ recentHomework }) => {
  const [query, setQuery] = useState('');

  const [dropped,setDropped] = useState(null);

  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  const search = useRef(null)

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

  useEffect(() => {
    const handler = (e) => {
      if (search.current && !search.current.contains(e.target)) {
        setDropped(false)
      }
    }
    document.addEventListener('mousedown',handler);

    return () => document.removeEventListener('mousedown',handler)
  },[])

  const handleKeyDown = (e) => {
    if (!filteredCards.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        (prev + 1) % filteredCards.length
      )
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => 
        (prev - 1 + filteredCards.length) % filteredCards.length
      )
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      navigate(`/history/${filteredCards[activeIndex].id}`)
    }
  }

  return (
    <div ref={search} className="search-bar">
      <input onKeyDown={handleKeyDown} onFocus={() => setDropped(true)} value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder='Search your homework history...' />
      <Search />
      { query && dropped && <div className="search-rslt">
        {filteredCards.map((card, index) =>
          <div onClick={() => navigate(`/history/${card.id}`)} className={`search-rslt-card ${index === activeIndex ? 'highlight-rslt' : ''}`} key={card.id}>
            <div className="search-rslt-title">
              {card.title}
            </div>
            </div>
        )}
      </div>}
    </div>
  )
}