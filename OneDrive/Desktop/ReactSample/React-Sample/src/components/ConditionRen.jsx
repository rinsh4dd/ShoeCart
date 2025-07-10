import { useState } from "react";

// function Condition() {
//     const [text,setText]=useState(true)

//     const Clicked = ()=>{
//         setText((prev)=>!prev)
//     }
//     return (
//         <>
//         <div>{text? <p>TRUE</p>:<p>FALSE</p>}</div>
//         <button onClick={Clicked}>CLICK</button>
//         </>
//     )
// }
// export default Condition;

// function Condition() {
//     const [text,setText]=useState(true)
//     const clicked = ()=>{
//         setText((prev)=>!prev)
//     }

//     return (
//         <>
//         <div>{text ? "True":"False"}</div>
//         <button onClick={clicked}>Click Me</button>
//         </>
//     )
//

function Condition() {
  const [color, setColor] = useState("");

  const handleonchange=(e)=>{
setColor(e.target.value)
  }
  return (
    <>
      <input type="text"
      placeholder="Enter color" 
      onChange={handleonchange}
      value={color}
      />
      <div 
      style={{background:color,width:"100px",height:"30px" , border:"2px solid black" , margin:"20px"}}
      ></div>
    </>
  );
}
export default Condition;
