import { useEffect, useLayoutEffect, useRef } from "react";
import { Copy, Download, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';

export const ChatSection = ({
  messages,
  markMessageAnimation,
  clickedCard,
}) => {
  const lastMessage = useRef(null);
  useEffect(() => {
    console.log(messages)
    
  }, [messages])
  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length]);



  return (
    <div className="chat-section">
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', margin: '20px 0' }} className="chat-messages">
        {
          messages.map((prompt) => (

            <div
              onAnimationEnd={() => markMessageAnimation(clickedCard.id, prompt.id)}
              key={prompt.id}
              className={`rslt-${prompt.role}-prompt`}
              style={{ animation: prompt.animated ? 'typing 3s steps(30, end) 1s forwards' : '' }}
            >{prompt.content}
              {
                prompt.role === 'ai' &&
                <div className="actions">
                  <Copy />
                  <Download />
                  <ThumbsUp style={{ color: prompt.reaction === 'like' ? 'var(--c-orange)' : '' }} 
                  onClick={() => {
                    markMessageAnimation(clickedCard.id, prompt.id,'like')
                  }
                  } />
                  <ThumbsDown style={{ color: prompt.reaction === 'dislike' ? 'var(--c-orange)' : '' }} onClick={() => {
                    markMessageAnimation(clickedCard.id, prompt.id, 'dislike')
                  }
                  } />
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