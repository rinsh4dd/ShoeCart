import React, { useEffect } from 'react'

function UseEffects() {

    useEffect(()=>{
        alert("Component rendered ✅")
    },[])
  return (
    <div style={{padding:"20px"}}>
      <h2>Hello, React!</h2>
      <p>open the console to see the Message</p>
    </div>
  )
}

export default UseEffects
