import { useEffect, useRef, useState } from 'react';
import { Copy, Download, SendHorizonal, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { RecordAudio } from '../../features/input-output/RecordAudio';
import { UploadFile } from '../../features/input-output/UploadFile'
import TextareaAutosize from 'react-textarea-autosize';
import '../../styles/history-page/HomeworkResult.css';

export const HomeworkResult = ({ clickedCard, closeResult, updateMessages, recentHomework }) => {
  const [isTyping, setIsTyping] = useState('');


  const resultWindow = useRef(null);
  const promptIn = useRef(null);



  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (resultWindow.current && !resultWindow.current.contains(e.target)) {
        closeResult()
      }
    })
  })
  
  

  const handleTextarea = (e) => {
    setIsTyping(e.target.value);
  }

  const submitPrompt = () => {

    if (!isTyping.trim() || !clickedCard) return;

    updateMessages(clickedCard.id, {
      role: 'user',
      content: isTyping
    })
    setIsTyping('');

    setTimeout(() => {
      updateMessages(clickedCard.id,{
        role: 'ai',
        content:'welcome,sorry this is still a demo comeback soon and have a great experience thank you enjoy your day'
      })
    }, 1500);
    console.log(clickedCard)
    console.log(messages)
  }
  const validCard = recentHomework.filter((card) => card && typeof card === 'object' && card.id)
  const currentCard = clickedCard ?
    validCard.find((card) => card.id === clickedCard.id)
    : [];
  const messages = currentCard.messages || [];
  return (
    <>
      {clickedCard &&
        <div ref={resultWindow} className="result-window">

          <div className="result-header">
            <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
            <h2 className='homework-title'>{clickedCard.title}</h2>
            <X className='close-window' onClick={closeResult} />
          </div>

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
            </div>

          </div>
          <div className="prompt-section">
            <TextareaAutosize value={isTyping} onChange={handleTextarea} ref={promptIn} className='prompt-in' maxRows={10} name="" id="" />
            <RecordAudio />
            <UploadFile />
            <button onClick={submitPrompt} style={{ background: isTyping ? 'var(--c-dark-orange' : '' }} className='submit-prompt'><SendHorizonal /></button>
          </div>
        </div>
      }
    </>
  )
}
