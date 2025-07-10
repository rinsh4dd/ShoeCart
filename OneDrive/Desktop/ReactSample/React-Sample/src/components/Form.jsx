import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <p>Hello, {name}!</p>
    </div>
  );
}

export default Form;
