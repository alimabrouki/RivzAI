import { useEffect, useRef } from 'react'
import '../../styles/history-page/HomeworkResult.css'
import { Copy, Download, SendHorizonal, Share, Share2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
export const HomeworkResult = ({ clickedCard, closeResult }) => {
  const resultWindow = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (resultWindow.current && !resultWindow.current.contains(e.target)) {
        closeResult()
      }
    })
  })
  return (
    <>
      {clickedCard && (
        <>
          <div ref={resultWindow} className="result-window">
            <div className="result-header">
              <img className='math-icon' src="/src/assets/images/math-icon.svg" alt="" />
              <h2 className='homework-title'>Homework Title</h2>
              <X className='close-window' onClick={closeResult} />
            </div>
            <div className="chat-section">
              <div style={{display:'flex', alignItems: 'flex-end',flexDirection:'column' , margin: '20px 0'}} className="chat-messages">
                <div className="rslt-user-prompt">
                <p>{clickedCard.text}</p>
              </div>
              <div className="ai-response">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum aliquam quia consectetur deleniti blanditiis dolore, autem suscipit tempora corrupti modi repellendus, inventore neque molestiae in minima nihil veniam, dignissimos sint.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem mollitia labore facere esse, nam voluptas tempore aspernatur illum enim eos quos itaque tempora eius excepturi cumque veritatis distinctio. Nobis, vitae!
                <br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat accusantium nostrum dolorum! Omnis possimus nam optio. Perferendis ut quae vel explicabo, odit dolorum nihil, tempore eos veritatis quaerat et magnam.
            <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veniam officia molestiae blanditiis odio tempore dolor dolore, quia itaque dolorum quo ducimus, non optio dolores perferendis laboriosam sunt libero laborum.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum amet, aperiam omnis architecto est, vitae libero facilis accusamus magnam, aspernatur ea animi nobis? Omnis eius rem nesciunt vero tenetur animi!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem possimus eius,
                <br />
                 porro, facilis animi molestias, iste doloribus obcaecati debitis maxime praesentium reiciendis odit mollitia blanditiis tempore eveniet cum quo voluptate!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta in eaque nemo sed explicabo et cumque tempora ducimus, animi quas dolorum aliquid, architecto perferendis. Nulla vero dolor quidem aperiam.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, ipsa quis minus dolores labore distinctio vitae, culpa laudantium fugit ratione omnis possimus! Nemo in illum laboriosam voluptas, consequatur aspernatur sit!
                <div className="actions">
                  <Copy />
                  <Download />
                  <ThumbsUp />
                  <ThumbsDown />
                  <Share2 />
                </div>
              </div>
              </div>
            </div>
            <div className="prompt-section">
              <textarea name="" id=""></textarea>
              <button><SendHorizonal /></button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
