import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/HomePage.css'
import { Mic } from 'lucide-react'
import { useRef } from 'react';

export const RecordAudio = () => {
  const audioRef = useRef(null)

  const recordAudio = () => {
    audioRef.current.click();
  }

  return (
    <>
      <input ref={audioRef} className='record-audio' type="file" name="audio-input" id="audio-input" accept="audio/*" capture="microphone" />

      <button onClick={recordAudio}>
        <Mic />
      </button>
    </>
  )
}