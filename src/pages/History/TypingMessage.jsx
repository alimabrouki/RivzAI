import { useEffect, useState } from "react"

export const TypingMessage = ({text}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20);
      return () => clearTimeout(timeout)
    }
  },[currentIndex,text])

  return (
    <div className="">
      {displayText}
    </div>
  )
}