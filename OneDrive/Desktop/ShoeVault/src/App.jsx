import "./App.css";

import React from "react";

import UserRouter from "./route";
import { GetAllProducts } from "./service/product";

function App() {
  return (
    <>
      <UserRouter />
    </>
  );
}

export default App;
