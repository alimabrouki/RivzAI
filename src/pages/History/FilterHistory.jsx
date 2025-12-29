import { useState } from "react"
import '../../styles/history-page/HistoryPage.css';
export const FilterHistory = () => {
  const [clicked, setClicked] = useState(0);
  return (
    <div className="filter-history">
      <button onClick={() => setClicked(0)} className={clicked === 0 ? 'btn-active' : ''} >All</button>
      <button onClick={() => setClicked(1)} className={clicked === 1 ? 'btn-active' : ''} >Bac Math</button>
      <button onClick={() => setClicked(2)} className={clicked === 2 ? 'btn-active' : ''}>Bac Science</button>
    </div>
  )
}