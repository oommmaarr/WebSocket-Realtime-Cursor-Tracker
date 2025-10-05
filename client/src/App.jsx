import { useState } from 'react'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import './App.css'
function App() {
  const [username,setUsername] = useState("")
  return username?<Home username={username}/>  : <Login onSubmit={setUsername}/>

}

export default App
