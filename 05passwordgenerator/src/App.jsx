import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // ref hook
  const passwordRef =  useRef(null)
  //copy function

  const copyPasswordToClipboard =  useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "`~!@#$%^&*()-_=+[{]}|;:',<.>/? "

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed,setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed, charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-700">
        <h1 className="text-white text-center text-xl font-semibold mb-4">
          Password Generator
        </h1>

        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            value={password}
            className="bg-white text-orange-700 outline-none w-3/4 py-2 px-3 rounded-lg shadow text-center"
            placeholder="password"
            readOnly
            ref = {passwordRef}
          />

          <button
          onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium"
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='text-orange-700'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='numberInput' className='text-orange-700'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={(e) => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='characterInput' className='text-orange-700'>Character</label>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
