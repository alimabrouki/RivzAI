import { useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { RecordAudio } from '../../features/input-output/RecordAudio';
import { UploadFile } from '../../features/input-output/UploadFile'
import { SendHorizonal } from 'lucide-react';

export const PromptSection = ({ addMessage, cardId, handleAiTyping }) => {
  const [isTyping, setIsTyping] = useState('');

  const promptIn = useRef(null);

  const handleTextarea = (e) => {
    setIsTyping(e.target.value);
  };


  const submitPrompt = () => {
    if (!isTyping.trim() || !cardId) return;

    addMessage(cardId, {
      id: crypto.randomUUID(),
      role: 'user',
      content: isTyping
    });

    setIsTyping('');
    handleAiTyping(true);

    setTimeout(() => {
      addMessage(cardId, {
        id: crypto.randomUUID(),
        role: 'ai',
        content: 'welcome, sorry this is still a demo comeback soon and have a great experience thank you enjoy your day',
        animated: true,
        reaction: ''
      })
    }, 1500);
  }

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        handleTextarea(e)
      } else {
        e.preventDefault()
        submitPrompt()
      }
    }
  }
  return (
    <div className="prompt-section">
      <TextareaAutosize onKeyDown={onEnterDown} value={isTyping} onChange={handleTextarea} ref={promptIn} className='prompt-in' maxRows={10} name="" id="" />
      <RecordAudio />
      <UploadFile />
      <button onClick={submitPrompt} style={{ background: isTyping ? 'var(--c-dark-orange' : '' }} className='submit-prompt'><SendHorizonal /></button>
    </div>
  )
}