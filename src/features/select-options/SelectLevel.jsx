import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/SelectOptions.css'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
export default function SelectLevel({ schoolOptions, placeHolder, storageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? placeHolder
  )
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedOpt))
  }, [selectedOpt, storageKey])

  const dropDown = useRef(null)
  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (dropDown.current && !dropDown.current.contains(e.target)) {
        setIsOpen(false)
      }
    })
  }, [])

  const onFocusShadow = {
    boxShadow: isOpen ? `0 0 40px hsla(38, 100%, 48%, 0.6),
    0 0 80px hsla(20, 100%, 55%, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.4)` : '',
    borderColor: isOpen ? `var(--c-orange)` : ''

  }

  return (
    <>
      <div onClick={() => {
        setIsOpen(!isOpen)
      }} style={onFocusShadow} className="select-options" ref={dropDown}>
        <div className={isOpen ? 'options-list' : ''}>
          {isOpen &&
            schoolOptions.map((option) => (
              <span
                onClick={() => {
                  setSelectedOpt(option.option);

                  console.log(option.option);
                }}
                key={option.id}
                value={option.option}
                className={`option ${selectedOpt === option.option ? 'selected-option' : ''}`}>
                {option.option}
              </span>
            ))}
        </div>
        <span>{selectedOpt}</span>
        <ChevronLeft width={20} className={`dropdown-arrow ${isOpen ? 'dropdown-arrow-down' : ''}`} />
      </div>
    </>
  )
}