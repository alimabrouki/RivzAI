import { useEffect, useLayoutEffect, useRef } from "react";
import { Copy, Download, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { TypingMessage } from "./TypingMessage";
export const ChatSection = ({
  messages,
  markMessageAnimation,
  aiIsTyping,
  card,
  addMessage,
  handleAiTyping
}) => {
  const lastMessage = useRef(null);

  const aiMessage = messages.findLast((msg) => msg.role === 'ai')

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: 'smooth', block: 'end'
    })
  }, [messages.length]);

  useEffect(() => {
    if (!card) return;
    if (card.messages.length === 1) {
      handleAiTyping(true)
      const timeout = setTimeout(() => {
        addMessage(card.id, {
          id: crypto.randomUUID(),
          role: 'ai',
          content: 'welcome, sorry this is still a demo comeback soon and have a great experience thank you enjoy your day',
          animated: true,
          reaction: ''
        })
      }, 1500);
      
      return () => clearTimeout(timeout)
    }
    console.log(card.messages)
  }, [card, addMessage,handleAiTyping])

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

                  <TypingMessage text={prompt.content} onDone={() => markMessageAnimation(card.id, prompt.id)} />

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
                        markMessageAnimation(card.id, prompt.id, 'like')
                      }
                      } />
                    <ThumbsDown style={{ color: prompt.reaction === 'dislike' ? 'var(--c-orange)' : '' }} onClick={() => {
                      markMessageAnimation(card.id, prompt.id, 'dislike')
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
        <div ref={lastMessage} className="dummy-msg"></div>
      </div>

    </>
  )
}