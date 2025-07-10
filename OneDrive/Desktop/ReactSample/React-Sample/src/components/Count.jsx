// import { useState } from "react";
// function Count() {
//   const [count, setCount] = useState(0);
//   const reset = () => {
//     setCount(0);
//   };
//   const increase = () => {
//     setCount(count + 1);
//   };
//   const decrease = () => {
//     setCount(count - 1);
//   };
//   return (
//     <div>
//       <p>count : {count}</p>
//       <button onClick={increase}>increase</button>
//       <button onClick={decrease}>decrease</button>
//       <button onClick={reset}>Clear</button>
//     </div>
//   );
// }

// export default Count;

import { useState } from "react";
function Count() {
  const [count, setCount] = useState(0);

  const reset = () => {
    setCount(0);
  };
  const incrememnt = () => {
    setCount((prev)=>prev+1);
  };

  const decrement = () => {

    // setCount(count-1);
    count==0 ? null:setCount(count-1)
  };

  return (
    <div className=

    "container">
      <p style={{color:'red'}}>{count}</p>
      <button style={{color:'red', backgroundColor:`${count>=10?"blue":""}`}} onClick={incrememnt}>Increment</button>
        <button style={{color:'red'}} onClick={decrement}>Decrement</button>
        <button style={{color:'red'}} onClick={reset}>Reset</button>
    </div>
  );
}

export default Count;
