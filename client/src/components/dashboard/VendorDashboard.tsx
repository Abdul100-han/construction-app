"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function VendorDashboard() {
  const { user, loading } = useAuth();

  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchProducts();
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // ✅ early exit for TypeScript safety

    try {
      const { data } = await api.post("/products", formData);

      const productWithVendor = {
        ...data.data,
        vendor: { _id: user.id },
      };

      setProducts((prev) => [...prev, productWithVendor]);

      setFormData({ name: "", description: "", price: "" });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // 🔁 Show loader until context fully resolves
  if (loading || !user) {
    return <div className="p-8 text-gray-600">Loading vendor dashboard...</div>;
  }

  const userProducts = products.filter((p) => p.vendor?._id === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Vendor!</h1>
      <p className="mt-2 text-black">Manage your listings.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Add Product Form */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Products
          </h2>
          {loadingProducts ? (
            <p className="text-gray-500">Loading products...</p>
          ) : userProducts.length === 0 ? (
            <p className="text-gray-500">No products listed yet</p>
          ) : (
            <div className="space-y-4">
              {userProducts.map((product) => (
                <div key={product._id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <p className="text-gray-900 font-medium mt-2">
                  ₦{parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
