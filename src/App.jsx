import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./components/CartContext";
import ScrollTopButton from "./components/ScrollTopButton";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling


import "./App.css";

function App() {
  return (
    <>
 <div className="min-h-fit flex flex-col">
      <CartProvider>
      <Navbar />
      <ScrollTopButton />
      <ToastContainer />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </CartProvider>
      
      </div>
    </>
  );
}

export default App;
