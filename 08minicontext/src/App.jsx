import { useState } from 'react'
import userContextProvider from './Context/UserContextProvider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <userContextProvider>
         <h1>fvfvhfbvhfbvhbfvhbfhbvhfbv</h1>
       </userContextProvider>
    </>
  )
}

export default App
