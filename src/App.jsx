import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import './styles/index.css'
import { HomePage } from './pages/HomePage'


function App() {


  return (
   
      <Routes>
        <Route index element={<HomePage />}/>
  
      </Routes>
    
  )
}

export default App
