import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Paperclip } from 'lucide-react'
import { useRef } from 'react';

export function UploadFile() {

  const inputRef = useRef(null);

  function uploadFile() {
    inputRef.current.click();
  }

  return (
    <>
      <input ref={inputRef} className='upload-file' type="file" name="homework-file" id="homework-file" accept="images/*,.pdf" />

      <button onClick={uploadFile}>
        <Paperclip />
      </button>
    </>
  )
}