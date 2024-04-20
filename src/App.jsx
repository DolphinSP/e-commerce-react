import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/contact" element={<h1>contact</h1>} />
    </Routes>
   </BrowserRouter>
  );
};
