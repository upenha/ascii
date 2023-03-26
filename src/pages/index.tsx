import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'


export default function Home() {
  const [ fonts, setFonts ] = useState([])
  const [selectedFont, setSelectedFont] = useState('1Row')
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  function handleChanges() {
    if(text !== '') {
      fetch('/api/generateBanner', {
        method: 'POST',
        body: JSON.stringify({ text: text, font: selectedFont })
        
      }).then((response) => response.json()).then((res) => {
        setResult(res.text)
      })
    } 
  }
  function handleText (e: any) {
    setText(e.target.value)
  }
  function handleChangeOption(e: any) {
    setSelectedFont(e.target.value)
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/listFonts')
      return res.json()
    }
    fetchData().then((data) => {
      setFonts(data)
    })
  }, [])
  return ( 
    <div className="bg-zinc-800 w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white font-default text-2xl font-bold mt-4">Gerar banner ASCII</h1>

        <input placeholder="Insira seu texto aqui" onInput={handleText} className="my-2 w-full rounded-md h-12 border border-zinc-600 bg-zinc-900 text-white font-default font-bold pl-3"></input>
        <select name="font" onChange={handleChangeOption} size={1} className="w-full h-12 rounded-md border border-zinc-600 bg-zinc-900 text-white font-default font-bold pl-3" placeholder="Selecione sua fonte">
          {fonts.map((font) => (
            <option label={font} key={font} value={font} />
          ))}
        </select>
        <button className="w-full h-12 rounded-md border border-zinc-600 bg-zinc-900 text-white font-default font-bold mt-2" onClick={handleChanges}>
          Gerar
        </button>
      </div>
      <pre className="font-default text-white bg-zinc-900 rounded-lg p-2 mt-4 align-center w-full h-full text-center align-center" dangerouslySetInnerHTML={{__html: result}}>
      </pre>
    </div>
  )
}
