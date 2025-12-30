export const HomeworkResult = ({ clickedCard, closeResult }) => {

  return (
    <>
      {clickedCard && (
        <>
          <div style={{ padding: '500px' }} className="">
            {clickedCard.text}
          </div>
          <div onClick={closeResult} style={{ fontSize: '40px' }} className="">x</div>
        </>
      )}
    </>
  )
}
