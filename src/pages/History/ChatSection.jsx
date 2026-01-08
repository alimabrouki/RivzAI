import { useLayoutEffect, useRef } from "react";
import { Copy, Download, SendHorizonal, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';

export const ChatSection = ({ messages, markMessageAnimated, clickedCard }) => {
  const lastMessage = useRef(null);

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])
  console.log(messages)
  return (
    <div className="chat-section">
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', margin: '20px 0' }} className="chat-messages">
        {
          messages.map((prompt) => (

            <div 
            onAnimationEnd={() => markMessageAnimated(clickedCard.id, prompt.id)} 
            key={prompt.id} 
            className={`rslt-${prompt.role}-prompt` }
            style={ {animation: prompt.animated ? 'typing 3s steps(30, end) 1s forwards': ''}}
            >{prompt.content}
              {
                prompt.role === 'ai' &&
                <div className="actions">
                  <Copy />
                  <Download />
                  <ThumbsUp />
                  <ThumbsDown />
                  <Share2 />
                </div>
              }
            </div>

          ))}
        <div ref={lastMessage} className="dummy-msg"></div>
      </div>
    </div>
  )
}