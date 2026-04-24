import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { RecordAudio } from '../../features/input-output/RecordAudio';
import { UploadFile } from '../../features/input-output/UploadFile'
import { SendHorizonal } from 'lucide-react';
import '../../styles/history-page/PromptSection.css';
import type { Message } from "../../types/Chat";

type PromptSectionProps = {
  addMessage: (cardId: string, message: Message) => void;
  cardId: string;
  handleAiTyping: (state: boolean) => void;
}

export const PromptSection = ({
  addMessage,
  cardId,
  handleAiTyping
}: PromptSectionProps) => {
  const [isTyping, setIsTyping] = useState('');

  const promptIn = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        content: 'You’re viewing a demo of RivzAI. The chat experience is under development and will be available soon.',
        animated: true,
        reaction: null
      })
    }, 1500);
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return;
      if (isMobile) {
        return;
      } else {
        e.preventDefault()
        submitPrompt()
      }

    }
  }

  const focusPrompt = () => {
    promptIn.current?.focus();
  }
  return (
    <div className="prompt-section" onClick={focusPrompt}>
      <TextareaAutosize onKeyDown={onKey} value={isTyping} onChange={handleTextarea} ref={promptIn} className='prompt-in' minRows={1} maxRows={10} name="" id="" placeholder="Ask RivzAI" />
      <div className="prompt-btns">
        <RecordAudio />
        <UploadFile />
        <button onClick={submitPrompt} style={{ background: isTyping ? 'var(--c-dark-orange' : '' }} className='submit-prompt'><SendHorizonal /></button>
      </div>
    </div>
  )
}