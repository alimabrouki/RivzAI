import { Mic } from 'lucide-react'
import { useRef } from 'react';

export const RecordAudio = () => {
  const audioRef = useRef<HTMLInputElement | null>(null)

  const recordAudio = () => {
    audioRef.current?.click();
  }

  return (
    <>
      <input ref={audioRef} className='record-audio' type="file" name="audio-input" id="audio-input" accept="audio/*" capture="user" />

      <button onClick={recordAudio}>
        <Mic />
      </button>
    </>
  )
}
