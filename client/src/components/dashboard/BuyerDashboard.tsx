'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function BuyerDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Buyer!</h1>
      <p className="mt-2 text-gray-600">Access the marketplace.</p>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product._id} className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-gray-900 font-medium mt-2">₦{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Sold by: {product.vendor.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}