import '../../styles/hooks-styles/useIntersectionAnimation.css'
import { PromptBox } from './PromptBox'
import { RecentHomework } from './RecentHomework'

import { FeaturesBoxes } from './FeaturesBoxes'
export const HomePageWrapper = ({handleAddHistory,addedHistory,handleOpenLastCard}) => {
 

  return (
    <div className="wrapper">
      <div className="hero">
        <h1 className='hero-title'><span className='orange-hero-title'>Rivz</span> With <span className='orange-hero-title'>AI</span> Now!</h1>
        <h3 className='under-title'>
          RivzAI brings elite AI problem-solving straight to your homework <span className='orange-under-title'>Fast</span>, <span className="orange-under-title"> Precise</span>, <span className="orange-under-title"> Grade-boosting</span>
        </h3>
        <h3 className='under-title-two'>
          jibnelk a9wa AI agent bech irivz w ye5dem m3ak as3eb les exercices
        </h3>
        <PromptBox handleOpenLastCard={handleOpenLastCard}  recentHomework={addedHistory} handleAddHistory={handleAddHistory} />
        <RecentHomework addHistory={addedHistory} />
        <FeaturesBoxes />
      </div>
    </div>
  )
}