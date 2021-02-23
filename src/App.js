import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import saveToLocal from './lib/saveToLocal';
import loadFromLocal from './lib/loadFromLocal';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';

function App() {
  const STORAGE_KEY = 'Products';

  const [products, setProducts] = useState(loadFromLocal(STORAGE_KEY) ?? []);

  useEffect(() => {
    saveToLocal(STORAGE_KEY, products);
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: uuidv4() }]);
  };

  const deleteCard = (id) => {
    const updatedList = products.filter((product) => product.id !== id);
    setProducts(updatedList);
  };

  return (
    <>
      <ProductForm onSubmitForm={addProduct} />
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onDeleteCard={() => deleteCard(product.id)}
        />
      ))}
    </>
  );
}

export default App;
