import '../../styles/home-page/PromptBox.css'
import { RecordAudio } from '../../features/input-output/RecordAudio'
import { SolveItBtn } from '../../features/SolveItBtn'
import { UploadFile } from '../../features/input-output/UploadFile'
import { SelectOptions } from '../../features/select-options/SelectOptions'
import { MultiStepBtn } from '../../features/MultiStepBtn'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const PromptBox = ({ handleAddHistory, handleOpenLastCard }) => {
  const [textvalue, setTextValue] = useState('');



  const handleSubmit = () => {
    handleAddHistory(textvalue)
    setTextValue('')
    handleOpenLastCard(textvalue)
  }

  const handleTextArea = (e) => {
    setTextValue(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        handleTextArea(e)
      } else {
        e.preventDefault();
        handleSubmit()
      }
    }
  }

  return (
    <div className="prompt-box">
      <textarea value={textvalue} onKeyDown={onKeyDown} onChange={handleTextArea} name="" id="" className='prompt-input' placeholder='Put your homework here, and let’s break it down together...' />
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