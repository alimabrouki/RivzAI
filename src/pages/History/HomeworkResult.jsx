import { useEffect, useRef } from 'react';
import '../../styles/history-page/HomeworkResult.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { X } from 'lucide-react';

export const HomeworkResult = ({
  clickedCard,
  closeResult,
  updateMessages,
  recentHomework,
 markMessageAnimation
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
            clickedCard={clickedCard}
            messages={messages}
            markMessageAnimation={markMessageAnimation}
          />
          <PromptSection updateMessages={updateMessages} clickedCard={clickedCard} />
        </div>
      }
    </>
  )
}
