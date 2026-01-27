import { Route, Routes, useNavigate } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { HistoryPage } from './pages/History/HistoryPage'
import { ChatPage } from './pages/History/ChatPage'
import './styles/index.css'
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import { useState } from 'react'
import TeacherMode from './pages/teacher-mode/TeacherMode'
import AuthPage from './pages/auth/AuthPage'
import type { HomeworkCard, Message } from './types/Chat'


export const App = () => {
  const [addedHistory, setAddedHistory] = useLocalStorage('Homeworks', [
    {
      id: crypto.randomUUID(),
      title: 'The Water Cycle Explained',
      text: 'Explain the stages of the water cycle in a simple way, including evaporation, condensation, precipitation, and collection, as if I’m a 7th-grade student.',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: 'new homework'
        }
      ],
      timestamp: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: 'Solve Quadratic Equations',
      text: 'Solve the quadratic equation 2x² + 5x – 3 = 0 step by step, showing how to use the quadratic formula and simplify the results.',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: 'new homework'
        }
      ],
      timestamp: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: 'Photosynthesis Process',
      text: 'Describe the process of photosynthesis in plants, explaining how sunlight, water, and carbon dioxide produce glucose and oxygen, in a way that is easy to understand.',
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
  const [aiIsTyping, setAiIsTyping] = useState(false);

  const navigate = useNavigate();

  const openHistoryCard = (id: string) => navigate(`/history/${id}`);

  const createHistoryItem = (newPrompt: string): HomeworkCard => ({
    id: crypto.randomUUID(),
    title: newPrompt.slice(0, 50),
    text: newPrompt,
    messages: [
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: newPrompt,
        animated: true,
        reaction: null
      }
    ],
    timestamp: new Date().toISOString()
  });

  const prependHistoryItem = (item: HomeworkCard) => setAddedHistory((prev: HomeworkCard[]) => [item, ...prev]);

  const addHistory = (newPrompt: string) => {
    const card = createHistoryItem(newPrompt);
    prependHistoryItem(card);
    openHistoryCard(card.id)
  }

  const deleteHistoryItem = (deletedCardId: string) => {
    setAddedHistory((prev: HomeworkCard[]) =>
      prev.filter((item) => item.id !== deletedCardId)
    );
    navigate('/history/')
  }

  const handleHistoryCardClick = (homework: HomeworkCard) => {
    openHistoryCard(homework.id)
  }

  const handleAiTyping = (state: boolean) => setAiIsTyping(state);

  const addMessage = (cardId: string, message: Message) => {
    setAddedHistory((prev: HomeworkCard[]) =>
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
    setAiIsTyping(false)
  }

  const markMessageAnimation = (cardId: string, msgId: string, reactionType?: 'like' | 'dislike' | null) => {
    setAddedHistory((prev: HomeworkCard[]) =>
      prev.map((card: HomeworkCard) =>
        card.id === cardId ?
          {
            ...card,
            messages: card.messages.map((m: Message) =>
              m.id === msgId ?
                {
                  ...m,
                  animated: false,
                  reaction: m.reaction === reactionType ? null : reactionType
                } : m
            )
          } : card
      ))
  }

  return (
    <Routes>
      <Route index path='/' element={<HomePage addHistory={addHistory} addedHistory={addedHistory} />} />
      <Route index path='/history'
        element={<HistoryPage
          addedHistory={addedHistory}
          handleHistoryCardClick={handleHistoryCardClick}
        />} />
      <Route index path='/history/:cardId' element={
        <ChatPage
          deleteHistoryItem={deleteHistoryItem}
          handleAiTyping={handleAiTyping}
          aiIsTyping={aiIsTyping}
          markMessageAnimation={markMessageAnimation}
          addMessage={addMessage}
          recentHomework={addedHistory}
          closeChat={() => navigate(-1)}
        />
      } />
      <Route index path='/teacher-mode/' element={
        <TeacherMode />
      } />
      <Route index path='/auth/' element={
        <AuthPage />
      } />
    </Routes>
  )
}

export default App
