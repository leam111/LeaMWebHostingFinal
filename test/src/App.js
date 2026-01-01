
import Navbar from "./Navbar";
import Product from "./Product";
import Admin from "./Admin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <br></br>
        <Routes>
        <Route path="/product" element={<Product/>}/>
        <Route path="/Admin" element={<Admin/>}/>

        </Routes>
      </Router>
    </>
  );
};
export default App;
