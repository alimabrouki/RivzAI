import { Route, Routes } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { HistoryPage } from './pages/History/HistoryPage'
import './styles/index.css'
import { useLocalStorage } from '../src/hooks/useLocalStorage'


const App = () => {
   const [addedHistory, setAddedHistory] = useLocalStorage('newPrompt', [
   'r','v','z'
   ]);
  
    const handleAddHistory = (newPrompt) => {
      const historyItem = {
        id: crypto.randomUUID(),
        title: newPrompt.slice(0,50),
        text: typeof newPrompt === 'string' ?  newPrompt : newPrompt.text ,
        messages: [
          {
          role: 'user',
          content: typeof newPrompt === 'string' ?  newPrompt : newPrompt.text
        },
        {
          role: 'ai',
          content: 'lets win in life !'
        }
      ],
        timestamp: new Date().toISOString()
      }
      setAddedHistory(prevHistory => [historyItem,...prevHistory ])
    }

    const updateMessages = (cardId,message) => {
     setAddedHistory(prev =>
      prev.map((card) => 
      card.id === cardId ? {
        ...card,
        messages:[
          ...card.messages,
         message
        ]
      } : card
      )
     ) 
    }
  
  return (
   
      <Routes>
        <Route index path='/' element={<HomePage handleAddHistory={handleAddHistory} addedHistory={addedHistory} />}/>
        <Route index path='/history' element={<HistoryPage  handleAddHistory={handleAddHistory} addedHistory={addedHistory} updateMessages={updateMessages} />}/>
      </Routes>
    
  )
}

export default App
