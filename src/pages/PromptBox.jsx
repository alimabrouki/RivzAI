import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { RecordAudio } from '../features/input-output/RecordAudio'
import { SolveItBtn } from '../features/SolveItBtn'
import { UploadFile } from '../features/input-output/UploadFile'
import { SelectOptions } from '../features/select-options/SelectOptions'
import {MultiStepBtn} from '../features/MultiStepBtn'
export const PromptBox = () => {
  return (
     <div className="prompt-box">
              <textarea name="" id="" className='prompt-input' placeholder='Put your homework here, and let’s break it down together...' />

              <div className="inputs">
                <div className="input-output">
                  <UploadFile />
                  <RecordAudio />
                </div>
                <SelectOptions />               
                <div className="btns">
                <MultiStepBtn />
                <SolveItBtn />
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