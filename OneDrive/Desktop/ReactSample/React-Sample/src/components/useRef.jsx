import React from "react";
import { useRef } from "react";
function UseRef() {
const inpRef = useRef(null);

const HandleClick = () =>{
    inpRef.current.focus();
}

  return (
    <div style={{ padding: "20px" }}>
      <h2>UseREf Example</h2>

      <input
        type="text"
        ref={inpRef}
        placeholder="Click here to focus"
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <br />
      <br />
      <button onClick={HandleClick}>Focus INPUT</button>
    </div>
  );
}
export default UseRef;
