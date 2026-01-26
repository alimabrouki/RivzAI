import { useEffect, useState } from "react"

type TypingMessageProps = {
  text : string ;
  onDone: () => void
}

export const TypingMessage = ({ text, onDone } : TypingMessageProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30);
      return () => clearTimeout(timeout)
    }
    onDone()
  }, [currentIndex, text,onDone])


  return (
    <div className="">
      {displayText}
    </div>
  )
}