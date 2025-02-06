import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navb from "./components/Navb";

import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import FinalPayment from "./components/FinalPayment";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<FinalPayment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
