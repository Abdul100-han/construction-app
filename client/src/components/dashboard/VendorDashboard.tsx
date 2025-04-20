'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function VendorDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const { user } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/products', formData);
      setProducts([...products, data.data]);
      setFormData({
        name: '',
        description: '',
        price: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Vendor!</h1>
      <p className="mt-2 text-gray-600">Manage your listings.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.01"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Products</h2>
          {products.filter(p => p.vendor._id === user?.id).length === 0 ? (
            <p className="text-gray-500">No products listed yet</p>
          ) : (
            <div className="space-y-4">
              {products.filter(p => p.vendor._id === user?.id).map((product) => (
                <div key={product._id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <p className="text-gray-900 font-medium mt-2">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}