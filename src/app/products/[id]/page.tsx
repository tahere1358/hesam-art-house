'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    try {
      const response = await fetch(`/api/products?id=${productId}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Product not found</p>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.title}</span>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-gray-400">
                    <span>No image available</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h1>
                  
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {product.description || 'No description available'}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b">
                    <p className="text-sm text-gray-500">
                      Product ID: {product.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Added: {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="font-semibold">
                      Quantity:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                      addedToCart
                        ? 'bg-green-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>

                  <Link
                    href="/products"
                    className="block w-full py-3 rounded-lg font-semibold text-center text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">More related products coming soon</p>
              <Link
                href="/products"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
