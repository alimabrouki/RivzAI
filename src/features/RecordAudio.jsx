import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Mic } from 'lucide-react'
import { useRef } from 'react';

export function RecordAudio() {
  const audioRef = useRef(null)

  function recordAudio() {
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