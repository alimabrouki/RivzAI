import { useLayoutEffect, useRef } from "react";
import { Copy, Download, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { TypingMessage } from "./TypingMessage";
export const ChatSection = ({
  messages,
  markMessageAnimation,
  aiIsTyping,
  cardId
}) => {
  const lastMessage = useRef(null);

  const aiMessage = messages.findLast((msg) => msg.role === 'ai')

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: 'smooth', block: 'end'
    })
  }, [messages.length]);

  return (
    <>
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

                  <TypingMessage text={prompt.content} onDone={() => markMessageAnimation(cardId, prompt.id)} />

                  :
                  prompt.content
                }

                {
                  prompt.role === 'ai' && !prompt.animated &&
                  <div className="actions">
                    <Copy />
                    <Download />
                    <ThumbsUp style={{ color: prompt.reaction === 'like' ? 'var(--c-orange)' : '' }}
                      onClick={() => {
                        markMessageAnimation(cardId, prompt.id, 'like')
                      }
                      } />
                    <ThumbsDown style={{ color: prompt.reaction === 'dislike' ? 'var(--c-orange)' : '' }} onClick={() => {
                      markMessageAnimation(cardId, prompt.id, 'dislike')
                    }
                    } />
                    <Share2 />

                  </div>
                }
              </div>
            ))
          }
          {aiIsTyping &&
            <div className="typing">
              <div className="typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          }
          
        </div>
        
      </div>
<div ref={lastMessage} className="dummy-msg"></div>
    </>
  )
}