import React from 'react';
import useFetchAll from './services/useFetchAll';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, updateQuantity }) {
  const navigate = useNavigate();
  const urls = cart.map((eachItem) => `products/${eachItem.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (eachProduct) => eachProduct.id === parseInt(id)
    );

    const { size } = skus.find((eachSku) => eachSku.sku === sku);

    return (
      <li key={sku} className='cart-item'>
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size} </p>
          <p>
            <select
              aria-label={`Select quantity for name ${name} size ${size}`}
              value={quantity}
              onChange={(event) =>
                updateQuantity(sku, parseInt(event.target.value))
              }
            >
              <option value='0'>Remove</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section id='cart'>
      <h1>
        {totalItemsInCart === 0
          ? 'Your cart is empty'
          : `${totalItemsInCart} Item${
              totalItemsInCart > 1 ? 's' : ''
            } in My cart`}
      </h1>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length > 0 && (
        <button
          className='btn btn-primary'
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
