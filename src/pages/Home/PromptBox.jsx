import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/HomePage.css'
import { RecordAudio } from '../../features/input-output/RecordAudio'
import { SolveItBtn } from '../../features/SolveItBtn'
import { UploadFile } from '../../features/input-output/UploadFile'
import { SelectOptions } from '../../features/select-options/SelectOptions'
import {MultiStepBtn} from '../../features/MultiStepBtn'
import { useEffect, useState } from 'react'


export const PromptBox = ({handleAddHistory}) => {
  const [textvalue, setTextValue] = useState('');
  const [addHistory, setAddHistory] = useState('')

  const handleSubmit = () => {
    handleAddHistory(addHistory)
    setTextValue('')
  }
 
  useEffect(() => {
    setAddHistory(textvalue)
  },[textvalue])

  const handleTextArea = (e) => {
    setTextValue(e.target.value)
   }
  
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        setTextValue(textvalue)
      } else {
      e.preventDefault();
      handleAddHistory(addHistory)
      setTextValue('')
      }
    }
  }
  return (
     <div className="prompt-box">
              <textarea value={textvalue} onKeyDown={onKeyDown}  onChange={handleTextArea} name="" id="" className='prompt-input' placeholder='Put your homework here, and let’s break it down together...' />

              <div className="inputs">
                <div className="input-output">
                  <UploadFile />
                  <RecordAudio />
                </div>
                <SelectOptions />               
                <div className="btns">
                <MultiStepBtn />
                <SolveItBtn submit={handleSubmit} />
              </div>
              </div>
              <div className="formatted-prompts">
                <span>“Solve this problem”</span>
                <span>“Explain this chapter”</span>
                <span>“Correct my answer”</span>
              </div>
            </div>
  )
}