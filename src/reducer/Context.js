import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { cartReducer } from './UseReducer';

const Cart = createContext();

const Context = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [userData, setUserData] = useState({});

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:4000/product");
      setProduct(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        throw new Error('Failed to fetch user data');
      }
    } catch (err) {
      console.log(err);
      // Handle redirection or error
    }
  };

  useEffect(() => {
    loadUsers();
    fetchUserData();
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
    isLoading: false,
  });

  return (
    <Cart.Provider value={{ state, dispatch, userData }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => useContext(Cart);

export default Context;