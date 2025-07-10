// import axios from "axios";
// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// function JsonServer() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/profiles")
//       .then((res) => setData(res.data))
//       .catch((e) => {
//         console.log("error occured");
//       });
//   }, []);
  
//   return (
//     <div>
//       <table className="table container mt-5">
//         <thead>
//           <tr>
//             <td>Id</td>
//             <td>Name</td>
//             <td>Email</td>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d, i) => {
//             return (
//               <tr key={i}>
//                 <td>{d.id}</td>
//                 <td>{d.name}</td>
//                 <td>{d.email}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default JsonServer;


import axios from "axios";
import { useEffect } from "react";

function JsonServer() {
  useEffect(() => {
    axios
      .post("http://localhost:5000/posts", {
        title: "New Blog",
        body: "This blog was posted using Axios POST!",
        userId: 5
      })
      .then((res) => console.log(" Data Posted:", res.data))
      .catch((err) => console.error(" Error:", err));
  }, []);

  return <h1>Check Console for POST</h1>;
}

export default JsonServer;
