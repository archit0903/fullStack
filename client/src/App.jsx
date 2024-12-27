import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import About from './Pages/About'
import SignUp from './Pages/SignUp'
import Header from './components/Header'
import Profile from './Pages/Profile'

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      
     </Routes>
    </BrowserRouter>
  )
}

export default App
