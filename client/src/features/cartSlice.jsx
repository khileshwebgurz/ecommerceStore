// this is a slice/reducer file where all the reduxx logic is present

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  addresses: [],
  users: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setCart, setAddresses, setUsers } = cartSlice.actions;

// 2nd here it will fetch the data from db and set the redux state with the items from the db through setCart reducer.
export const fetchCartFromDB = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

    // from here i am passing the token as a query parameter and this will be accessed in express using req.query.
    const response = await axios.get("http://localhost:5000/cart", {
      params: { userId },
    });
    dispatch(setCart(response.data.items));
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

// fetching user from db
export const fetchUserFromDB = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/users");
    dispatch(setUsers(response.data.users));
  } catch (error) {
    console.error("User not found");
  }
};

// Fetch addresses from DB
export const fetchAddressesFromDB = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/address");
    dispatch(setAddresses(response.data.addresses));
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

// add user to db and sync state
export const addUserAndSync = (user) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/users/signup", user);
    dispatch(fetchUserFromDB());
  } catch (error) {
    console.error("Error loading user from DB.", error);
  }
};

// Add address to DB and sync state
export const addAddressAndSync = (address) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    await axios.post("http://localhost:5000/address", { ...address, userId });
    dispatch(fetchAddressesFromDB());
  } catch (error) {
    console.error("Error adding address:", error);
  }
};

// starting here when someone clicks addtoCart from Homepage, the item gets added to db and also dispatch fetchCartFromDb function
export const addToCartAndSync = (product) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

    await axios.post("http://localhost:5000/cart", {
      ...product,
      quantity: 1,
      userId,
    });

    // Sync the Redux store with the updated cart data
    dispatch(fetchCartFromDB());
  } catch (error) {
    console.error("Error saving to cart:", error);
  }
};

// 3rd when i move to /cart page and clicks the Remove Item then this function is exceuted by deleting the item from db based on id and
// update the redux state based on the db
export const removeFromCartAndSync = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/cart/${id}`);
    dispatch(fetchCartFromDB());
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};

// this is for updating the quantity of the product
export const updateCartQuantity = (id, quantity) => async (dispatch) => {
  try {
    // here we used put for updating the quantity of item in db and async the redux store with db
    // by dispatching the fetchCartFromDB().
    await axios.put(`http://localhost:5000/cart/${id}`, { quantity });
    dispatch(fetchCartFromDB()); // Sync state with updated data
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

export default cartSlice.reducer;
