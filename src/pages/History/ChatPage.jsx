import { useEffect, useRef, useState } from 'react';
import '../../styles/history-page/ChatPage.css';
import { PromptSection } from './PromptSection';
import { ChatSection } from './ChatSection';
import { BsFillArrowLeftCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { useParams } from 'react-router-dom';

export const ChatPage = ({
  closeChat,
  addMessage,
  markMessageAnimation,
  handleAiTyping,
  aiIsTyping,
  recentHomework,
  deleteHistoryItem
}) => {
  const [isopen,setIsOpen] = useState(false)

  const { cardId } = useParams();

  const deletionAlert = useRef(null);

  const validCard = recentHomework.filter((card) => card && typeof card === 'object' && card.id);

  const card = validCard.find((card) => card.id === cardId);

  const messages = card.messages || [];

  const toggleDeletionAlert = () => setIsOpen(!isopen);

  useEffect(() => {
   document.addEventListener('mousedown', (e) => {
     if (deletionAlert.current && !deletionAlert.current.contains(e.target)) {
      setIsOpen(!isopen)
    }
   })
  },[isopen])

  return (

    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>Chat</title>
      <div className="chat-page">
        {isopen && <div className="backdrop"></div>}
        <div className="wrapper">
          <div className="chat-header">
            <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
            <h2 className='homework-title'>{card.title}</h2>
            <div className="head-btns">
              <BsFillTrash3Fill className='delete-btn' onClick={toggleDeletionAlert} />
              <BsFillArrowLeftCircleFill className='close-window' onClick={closeChat} />
            </div>
            {isopen && 
            <div ref={deletionAlert} className='deletion-alert'>
              <div className="alert-message">
                Are You Sure You Want To Delete '{card.title}' ?
              </div>
              <div className="alert-btns">
              <button onClick={() => deleteHistoryItem(card.id)} className="yes-btn">Yes</button>
              <button onClick={toggleDeletionAlert} className="no-btn">No</button>
              </div>
            </div>
            }
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
