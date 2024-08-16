'use client'
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState('')
  async function upload(){
    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const json = await response.json
      console.log('json:', json)
    } catch (error){
      console.log({error})
    }
  }
  return (
    <main className="flex flex-col items-center justify-between">
      <input
      placeholder="Create a post"
      onChange={e => setData(e.target.value)}
      className="text-black px-2 py-1"
      />
      <button
      onClick={upload}
      className="text-black bg-white mt-2 px-12"
      >Upload text</button>
    </main>
  );
}
