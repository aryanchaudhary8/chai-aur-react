import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let [counter,setCounter] = useState(10)
  const increase = () =>
  {
    if(counter < 20)
    {
     setCounter(counter+1)
    }
  }
  const decrease = () => {
    if(counter > 0)
    {
    setCounter(counter-1)
    }
  }
  return (
    <>
      <h3>Chai or Code</h3>
      <p>Counter is : {counter}</p>
      <button onClick={increase}>Add button</button>
      <br/>
      <br/>
       <button onClick={decrease}>Decrease button</button>
    </>
  )
}

export default App
