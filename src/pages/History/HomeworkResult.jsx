import { useEffect, useRef } from 'react';
import '../../styles/history-page/HomeworkResult.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { X } from 'lucide-react';

export const HomeworkResult = ({
  clickedCard,
  closeResult,
  addMessage,
  markMessageAnimation,
  handleAiTyping,
  aiIsTyping,
  recentHomework
}) => {

  const resultWindow = useRef(null);

  const validCard = recentHomework.filter((card) => card && typeof card === 'object' && card.id)
  const currentCard = clickedCard ?
    validCard.find((card) => card.id === clickedCard.id)
    : [];
  const messages = currentCard.messages || [];

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (resultWindow.current && !resultWindow.current.contains(e.target)) {
        closeResult()
      }
    })
  });


  return (
    <>
      {clickedCard &&
        <div ref={resultWindow} className="result-window">
          <div className="result-header">
            <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
            <h2 className='homework-title'>{clickedCard.title}</h2>
            <X className='close-window' onClick={closeResult} />
          </div>
          <ChatSection
            aiIsTyping={aiIsTyping}
            clickedCard={clickedCard}
            markMessageAnimation={markMessageAnimation}
            messages={messages}
          />
          <PromptSection
            handleAiTyping={handleAiTyping}
            addMessage={addMessage} clickedCard={clickedCard} />
        </div>
      }
    </>
  )
}
