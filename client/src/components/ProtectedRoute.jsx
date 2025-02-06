import React from "react";
import { Navigate } from "react-router-dom";

// The children in the ProtectedRoute component is a special prop in React. It represents the content (or components) passed between the opening and
//  closing tags of the ProtectedRoute component (i.e /cart page in App.jsx) when used in your application.

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Check token

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
