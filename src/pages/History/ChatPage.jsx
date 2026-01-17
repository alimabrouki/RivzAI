import { useRef } from 'react';
import '../../styles/history-page/ChatPage.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { Header } from '../../components/Header';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
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
      <div ref={resultWindow} className="chat-page">
        <div className="wrapper">
          <div className="chat-header">
            <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
            <h2 className='homework-title'>{card.title}</h2>
            <BsFillArrowLeftCircleFill className='close-window' onClick={closeResult} />
          </div>
          <ChatSection
            aiIsTyping={aiIsTyping}
            card={card}
            markMessageAnimation={markMessageAnimation}
            messages={messages}
            addMessage={addMessage}
            handleAiTyping={handleAiTyping}
          />
          <PromptSection
            handleAiTyping={handleAiTyping}
            addMessage={addMessage} 
            cardId={card.id} 
            />
          <div className="mistakes-alert">RivzAI can make mistakes. Check Responses.</div>
        </div>
      </div>
    </>
  )
}
