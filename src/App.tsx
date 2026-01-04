import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/Auth'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
