import { useContext } from "react";
import ThemeContext from "./context";

function Button() {
  const Theme = useContext(ThemeContext); //Read current theme

  return (
    <button 
      style={{ background: Theme === "dark" ? "black" : "azure",
        color:Theme==="dark"?"white":"black",
        padding:"10px 20px",
        border:"none",
        borderRadius:"12px"
        ,margin:"010px"
       }}
    > i'm a {Theme} Button </button>
  );
}

export default Button