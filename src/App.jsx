import { Route, Routes } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { HistoryPage } from './pages/History/HistoryPage'
import './styles/index.css'
import { useLocalStorage } from '../src/hooks/useLocalStorage'


const App = () => {
   const [addedHistory, setAddedHistory] = useLocalStorage('newPrompt', [
      'Rewrite this paragraph simpler',
      'Translate to Arabic / French / English',
      'Summaries of lessons'
    ]);
  
    const handleAddHistory = (newPrompt) => {
      const historyItem = {
        id: crypto.randomUUID(),
        text: typeof newPrompt === 'string' ?  newPrompt : newPrompt.text ,
        timestamp: new Date().toISOString()
      }
      setAddedHistory(prevHistory => [historyItem,...prevHistory ])
      console.log(addedHistory)
    }

  return (
   
      <Routes>
        <Route index path='/' element={<HomePage handleAddHistory={handleAddHistory} addedHistory={addedHistory} />}/>
        <Route index path='/history' element={<HistoryPage addedHistory={addedHistory} />}/>
      </Routes>
    
  )
}

export default App
