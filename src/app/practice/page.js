'use client'
import { useState } from "react"
import axios from "axios"

export default function Axio(){
  const[quotes,setQuotes]=useState([]);
  const getQuote=()=>{
    axios.get('https://dummyjson.com/quotes')
    .then(res=>{console.log(res.data.quotes)
      setQuotes(res.data.quotes);
    }).catch(err =>{
      console.log(err);
    })
  }
  return (
    <>
    <div>
      <h1>HELLO</h1>
      <button onClick={getQuote}>Submit</button>
      {quotes.map((quotess) => (
        <div key={quotess.id}>
          <p>{quotess.quote}</p>
        </div>
      ))}
      </div>
    </>
  );
  
}