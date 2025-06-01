'use client';

import { useShopContext } from './context';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  const { products } = useShopContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
