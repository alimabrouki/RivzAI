import { useEffect, useRef } from 'react'
import '../../styles/history-page/HomeworkResult.css'
import { SendHorizonal, X } from 'lucide-react';
export const HomeworkResult = ({ clickedCard, closeResult }) => {
  const resultWindow = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (resultWindow.current && !resultWindow.current.contains(e.target)) {
        closeResult()
      }
    })
  })
  return (
    <>
      {clickedCard && (
        <>
          <div ref={resultWindow} className="result-window">
            <div className="result-header">
              <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
              <h2 className='homework-title'>Homework Title</h2>
              <X className='close-window' onClick={closeResult} />
            </div>
            <div className="chat-section">
              <div className="chat-messages">
                <div className="rslt-user-prompt">
                <p>{clickedCard.text}</p>
              </div>
              <div className="ai-response">
                
              </div>
              </div>
            </div>
            <div className="prompt-section">
              <textarea name="" id=""></textarea>
              <button><SendHorizonal /></button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
