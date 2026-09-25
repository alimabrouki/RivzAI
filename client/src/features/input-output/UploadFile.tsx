import { Paperclip } from 'lucide-react'
import { useRef } from 'react';

export const UploadFile = () => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = () => {
    inputRef.current?.click();
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
