import { useRef } from 'react';
import '../../styles/history-page/ChatPage.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { Header } from '../../components/Header';
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


  return (

    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>Chat</title>

      <Header />
<div ref={resultWindow} className="chat-page">
      <div className="wrapper">
        
          <div className="chat-header">
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
      </div>
    </>
  )
}
