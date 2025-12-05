import { Routes,Route} from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard'
import Navbar from './components/navbar'
import RfpPage from './pages/rfpPage'

function App() {
  return (
    <>
  <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rfp/:rfp_id" element={<RfpPage/>} />
    </Routes>
    </>
  )
}

export default App
