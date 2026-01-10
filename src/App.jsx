import { Route, Routes } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { HistoryPage } from './pages/History/HistoryPage'
import './styles/index.css'
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import { MdSportsGolf } from 'react-icons/md'


const App = () => {
  const [addedHistory, setAddedHistory] = useLocalStorage('newPrompt', [
    {
      id: crypto.randomUUID(),
      title: 'new homework',
      text: 'new homework',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: 'new homework'
        }
      ],
      timestamp: new Date().toISOString()
    }
  ]);

  const handleAddHistory = (newPrompt) => {
    const historyItem = {
      id: crypto.randomUUID(),
      title: newPrompt.slice(0, 50),
      text: typeof newPrompt === 'string' ? newPrompt : newPrompt.text,
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: typeof newPrompt === 'string' ? newPrompt : newPrompt.text
        }
      ],
      timestamp: new Date().toISOString()
    }
    setAddedHistory(prevHistory => [historyItem, ...prevHistory])
  }

  const updateMessages = (cardId, message) => {
    setAddedHistory(prev =>
      prev.map((card) =>
        card.id === cardId ? {
          ...card,
          messages: [
            ...card.messages,
            message
          ]
        } : card
      )
    )
  }

  const markMessageAnimated = (clickedCardId, msgId) => {
    setAddedHistory(prev =>
      prev.map((card) =>
        card.id === clickedCardId ?
          {
            ...card,
            messages: card.messages.map((m) =>
              m.id === msgId ?
                {
                  ...m,
                  animated: false
                } : m
            )
          } : card
      ))
  }

 const markReaction = (clickedCardId,msgId,reactionType) => {
  setAddedHistory(prev => 
    prev.map((card) => 
    card.id === clickedCardId ? 
  {
    ...card,
    messages: card.messages.map((m) => 
    m.id === msgId ? 
    {
      ...m,
      reaction: m.reaction === reactionType ? null : reactionType
    } : m
    )
  }: card
    )
  )
 }

  return (

    <Routes>
      <Route index path='/' element={<HomePage handleAddHistory={handleAddHistory} addedHistory={addedHistory} />} />
      <Route index path='/history' element={<HistoryPage  
      markMessageAnimated={markMessageAnimated} 
      handleAddHistory={handleAddHistory} 
      addedHistory={addedHistory} 
      updateMessages={updateMessages}
      markReaction={markReaction}
      />} />
    </Routes>

  )
}

export default App
