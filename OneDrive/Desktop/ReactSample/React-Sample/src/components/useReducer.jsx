import { useReducer } from "react";


const reduce=(count,action)=>{
    if(action.type=="increment") return count+1
    if(action.type=="Decrement") return count<=0?0:count-1
    if(action.type=="reset") return count=0
}


function Counter() {
  const [count, pasCount] = useReducer(reduce, 0);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={()=>pasCount({type:"increment"})}>Increment</button>
      <button onClick={()=>pasCount({type:"Decrement"})}>Decrement</button>
      <button onClick={()=>pasCount({type:"reset"})}>Reset</button>
    </>
  );
}

export default Counter 