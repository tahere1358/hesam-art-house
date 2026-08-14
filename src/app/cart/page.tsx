'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }

  function removeItem(id: number) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  async function handleCheckout() {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);

    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Demo user
          totalPrice: total,
          status: 'pending',
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Order created successfully! Order ID: ${data.data.id}`);
        setCartItems([]);
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Cart Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b">
                        <tr>
                          <th className="text-left px-6 py-3 font-semibold">Product</th>
                          <th className="text-center px-6 py-3 font-semibold">Price</th>
                          <th className="text-center px-6 py-3 font-semibold">Quantity</th>
                          <th className="text-right px-6 py-3 font-semibold">Total</th>
                          <th className="text-center px-6 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{item.title}</td>
                            <td className="text-center px-6 py-4 text-gray-600">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="text-center px-6 py-4">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, parseInt(e.target.value))
                                }
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
                              />
                            </td>
                            <td className="text-right px-6 py-4 font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="text-center px-6 py-4">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Clear Cart Button */}
                  <div className="p-6 border-t">
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (10%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping:</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </button>

                  <Link
                    href="/products"
                    className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
