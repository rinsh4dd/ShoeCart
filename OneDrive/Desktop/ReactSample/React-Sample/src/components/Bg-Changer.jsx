import React, { useState } from "react";

function BgChange() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyle = {
    height: "100vh",
    backgroundColor: isDarkMode ? "black" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    transition: "all 0.3s ease",
  };
  return (
    <div style={appStyle}>
      <h1>{isDarkMode ? "DARK MODE" : " LIGHT  MODE "}</h1>
      <button onClick={toggleMode}>
        switch to{isDarkMode ? "Light" : "Dark"}Mode
      </button>
    </div>
  );
}

export default BgChange;
