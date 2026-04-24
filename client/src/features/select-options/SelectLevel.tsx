import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/home-page/SelectOptions.css';
import { ChevronLeft } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect, useRef, useState } from 'react';

type SelectLevelProps = {
  schoolOptions: {id: number ; option: string}[];
  placeHolder: string;
  storageKey: string
}

export const SelectLevel = ({ 
  schoolOptions, 
  placeHolder, 
  storageKey }:SelectLevelProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useLocalStorage(storageKey ,placeHolder)

  const dropDown = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropDown.current && !dropDown.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler)
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