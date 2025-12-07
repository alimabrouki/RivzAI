import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/SelectOptions.css'
import { useEffect,  useState } from 'react'
export default function SelectLevel({schoolOptions,placeHolder,storageKey}) {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? placeHolder
  )
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedOpt))
  }, [selectedOpt,storageKey])

  const handleSlctSchlLvl = () => {
   setIsOpen(!isOpen)
  }

  return(
    <>
      <div onClick={handleSlctSchlLvl} className="select-options">
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
              >
                {option.option}
              </span>
            ))}
        </div>
        <span>{selectedOpt}</span>
      </div>
      </>
  )
}