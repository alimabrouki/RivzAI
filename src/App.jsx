import { Route, Routes } from 'react-router'
import './styles/index.css'
import { HomePage } from './pages/Home/HomePage'


const App = () => {


  return (
   
      <Routes>
        <Route index element={<HomePage />}/>
  
      </Routes>
    
  )
}

export default App
