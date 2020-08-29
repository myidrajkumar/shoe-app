import React, { useState } from 'react';
import Spinner from './Spinner';
import useFetch from './services/useFetch';
import { useParams, Link } from 'react-router-dom';
import PageNotFound from './PageNotFound';

export default function Products() {
  const [size, setSize] = useState('');
  const { category } = useParams();

  const { data: products, error, loading } = useFetch(
    'products?category=' + category
  );

  function renderProduct(product) {
    return (
      <div key={product.id} className='product'>
        <Link to={`/${category}/${product.id}`}>
          <img src={`/images/${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((eachProduct) =>
        eachProduct.skus.find((eachSku) => eachSku.size === parseInt(size))
      )
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <>
      <section id='filters'>
        <label htmlFor='size'>Filter by Size:</label>{' '}
        <select
          id='size'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value=''>All sizes</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items </h2>}
      </section>
      <section id='products'>{filteredProducts.map(renderProduct)} </section>
    </>
  );
}
