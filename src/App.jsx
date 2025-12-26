import { Route, Routes } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { HistoryPage } from './pages/History/HistoryPage'
import './styles/index.css'


const App = () => {


  return (
   
      <Routes>
        <Route index path='/' element={<HomePage />}/>
        <Route index path='/history' element={<HistoryPage />}/>
      </Routes>
    
  )
}

export default App
