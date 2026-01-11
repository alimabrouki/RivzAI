import { useEffect, useLayoutEffect, useRef } from "react";
import { Copy, Download, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { TypingMessage } from "./TypingMessage";
export const ChatSection = ({
  messages,
  markMessageAnimation,
  clickedCard,
}) => {
  const lastMessage = useRef(null);
  const aiMessage = messages.findLast((msg) => msg.role === 'ai')
  useEffect(() => {
    console.log(messages)
    console.log(aiMessage)
    console.log(clickedCard)
  }, [messages, aiMessage, clickedCard]);

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length]);



  return (
    <div className="chat-section">
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', margin: '20px 0' }} className="chat-messages">
        {
          messages.map((prompt) => (

            <div
              key={prompt.id}
              className={`rslt-${prompt.role}-prompt`}
            >
              {prompt === aiMessage && prompt.animated
                ?
                <TypingMessage text={prompt.content} onDone={() => markMessageAnimation(clickedCard.id, prompt.id)} />
                :
                prompt.content
              }
              {
                prompt.role === 'ai' &&
                <div className="actions">
                  <Copy />
                  <Download />
                  <ThumbsUp style={{ color: prompt.reaction === 'like' ? 'var(--c-orange)' : '' }}
                    onClick={() => {
                      markMessageAnimation(clickedCard.id, prompt.id, 'like')
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