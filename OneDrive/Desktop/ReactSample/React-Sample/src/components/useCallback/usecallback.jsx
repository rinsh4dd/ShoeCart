import { useState } from "react"

function Usecallback(){
const [count,setCount]=useState(0)
const [other,setOther]=useState(0)

const increment=Usecallback(()=>{
setCount((prev)=>[prev+1])
},[])
    return (
<div>
<h1>CallBack Counter Example</h1>
<p>Count :{count}</p>
<p>Count :{other}</p>

<button  onClick={increment}>+</button>
</div>
    )
}
export default Usecallback