import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { Route, Routes } from 'react-router-dom';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    } catch {
      console.error('The cart could not be parsed into JSon');
      return [];
    }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const addToCart = (id, sku) => {
    debugger;
    setCart((items) => {
      const isItemInCart = items.find((eachItem) => eachItem.sku === sku);
      if (isItemInCart) {
        return items.map((eachItem) =>
          eachItem.sku === sku
            ? { ...eachItem, quantity: eachItem.quantity + 1 }
            : eachItem
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (sku, quantity) => {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((eachItem) => eachItem.sku !== sku);
      }
      return items.map((eachItem) =>
        eachItem.sku === sku ? { ...eachItem, quantity } : eachItem
      );
    });
  };

  const emptyCart = () => setCart([]);

  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route
              path='/:caregory/:id'
              element={<Details addToCart={addToCart} />}
            />
            <Route
              path='/Cart'
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path='/checkout'
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
