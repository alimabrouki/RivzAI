import { useEffect, useRef } from "react";
import { Copy, Download, SendHorizonal, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';

export const ChatSection = ({messages}) => {
const lastMessage = useRef(null);
 useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className="chat-section">


            <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', margin: '20px 0' }} className="chat-messages">



              {
                messages.map((prompt, index) => (
                  <>
                    <div key={index} className={`rslt-${prompt.role === 'user' ? 'user' : 'ai'}-prompt`}>{prompt.content}
                      {
                        prompt.role === 'ai' ?
                          <div className="actions">
                            <Copy />
                            <Download />
                            <ThumbsUp />
                            <ThumbsDown />
                            <Share2 />
                          </div> : ''
                      }

                    </div>
                   
                  </>
                ))}
                 <div ref={lastMessage} className="dummy-msg"></div>
            </div>

          </div>
  )
}