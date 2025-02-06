import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentBtn = () => {
  const [btnName, setBtnName] = useState("Checkout");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cart") {
      setBtnName("Checkout");
    } else {
      setBtnName("Pay and Order");
    }
  }, [location.pathname]);

  const handlebtnClick = () => { 
    if (btnName === 'Pay and Order') {
      navigate('/payment');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <button onClick={handlebtnClick} className="bg-dark text-white"> 
      {btnName}
    </button>
  );
};

export default PaymentBtn;
