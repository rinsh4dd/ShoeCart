import { useState, useEffect } from "react";

function Count2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer=setInterval(()=>{
        setCount((prev)=>prev+1)
    },1000);
    return ()=>{
        clearInterval(timer)
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      ⏱️Counter:{count}
    </div>
  );
}

export default Count2;
