import "./App.css";

import React from "react";

import UserRouter from "./route";
import { GetAllProducts } from "./service/product";

function App() {
  
  
  return (
    <>


    <UserRouter/>
    </>
    // <Router>
    //   <div className="min-h-screen bg-gray-50 flex flex-col">
    //     <Routes>
    //       {/* Routes with navbar + footer
    //       <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
    //       <Route path="/cart" element={<MainLayout><ShowCarts /></MainLayout>} />
    //       <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
    //       <Route  path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>}/>
    //       {/* Routes without navbar + footer */}
    //       {/* <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
    //       <Route path="/signup" element={<AuthLayout><RegistrationPage /></AuthLayout>} /> */} 
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
