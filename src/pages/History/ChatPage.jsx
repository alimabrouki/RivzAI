import { useEffect, useRef } from 'react';
import '../../styles/history-page/ChatPage.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { X } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ChatPage = ({
  closeResult,
  addMessage,
  markMessageAnimation,
  handleAiTyping,
  aiIsTyping,
  recentHomework
}) => {
  const { cardId } = useParams();

  const resultWindow = useRef(null);

  const validCard = recentHomework.filter((card) => card && typeof card === 'object' && card.id);

  const card = validCard.find((card) => card.id === cardId);

  const messages = card.messages || [];

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (resultWindow.current && !resultWindow.current.contains(e.target)) {
        closeResult()
      }
    })
  });

  return (
    <>      
        <div ref={resultWindow} className="result-window">
          <div className="result-header">
            <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
            <h2 className='homework-title'>{card.title}</h2>
            <X className='close-window' onClick={closeResult} />
          </div>
          <ChatSection
            aiIsTyping={aiIsTyping}
            cardId={card.id}
            markMessageAnimation={markMessageAnimation}
            messages={messages}
          />
          <PromptSection
            handleAiTyping={handleAiTyping}
            addMessage={addMessage} cardId={card.id} />
        </div>
    </>
  )
}
