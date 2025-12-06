import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/SelectOptions.css'
import { useEffect,  useState } from 'react'
export default function SelectLevel({schoolLevelOptions}) {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(
    JSON.parse(localStorage.getItem('OPTION')) ?? 'Select Level'
  )
  useEffect(() => {
    localStorage.setItem('OPTION', JSON.stringify(selectedOpt))
  }, [selectedOpt])

  const handleSlctSchlLvl = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return(
    <>
    <div onClick={handleSlctSchlLvl} className="select-options">

        <div className={isOpen ? 'options-list' : ''} >
          {isOpen && (

            schoolLevelOptions.map((option) => {
              return (

                <span onClick={() => {

                  setSelectedOpt(option.option)
                  console.log(option.option)

                }} key={option.id} value={option.option}>{option.option}</span>

              )
            })
          )}

        </div>
        <span>{selectedOpt}</span>
      </div>
      </>
  )
}