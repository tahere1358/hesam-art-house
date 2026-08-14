'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
}

interface RecentOrder {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();

      // Fetch orders
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();

      // Fetch users
      const usersRes = await fetch('/api/users');
      const usersData = await usersRes.json();

      const orders = ordersData.data || [];
      const products = productsData.data || [];
      const users = usersData.data || [];

      const totalRevenue = orders.reduce(
        (sum: number, order: RecentOrder) => sum + order.totalPrice,
        0
      );

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        revenue: totalRevenue,
      });

      // Sort orders by recent
      const sorted = [...orders].sort(
        (a: RecentOrder, b: RecentOrder) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentOrders(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to your admin dashboard</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading dashboard...</p>
            </div>
          ) : activeTab === 'overview' ? (
            // Overview Tab
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">
                        Total Products
                      </p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {stats.totalProducts}
                      </p>
                    </div>
                    <div className="text-4xl text-blue-600">📦</div>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">
                        Total Orders
                      </p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {stats.totalOrders}
                      </p>
                    </div>
                    <div className="text-4xl text-green-600">🛒</div>
                  </div>
                </div>

                {/* Total Users */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">
                        Total Users
                      </p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {stats.totalUsers}
                      </p>
                    </div>
                    <div className="text-4xl text-purple-600">👥</div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">
                        Total Revenue
                      </p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        ${stats.revenue.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-4xl text-orange-600">💰</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                {recentOrders.length === 0 ? (
                  <p className="text-gray-600">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b">
                        <tr>
                          <th className="text-left px-6 py-3 font-semibold">
                            Order ID
                          </th>
                          <th className="text-left px-6 py-3 font-semibold">
                            User ID
                          </th>
                          <th className="text-left px-6 py-3 font-semibold">
                            Amount
                          </th>
                          <th className="text-left px-6 py-3 font-semibold">
                            Status
                          </th>
                          <th className="text-left px-6 py-3 font-semibold">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-semibold">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4">{order.userId}</td>
                            <td className="px-6 py-4 font-semibold">
                              ${order.totalPrice.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  order.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Orders Tab
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">All Orders</h2>
              {recentOrders.length === 0 ? (
                <p className="text-gray-600">No orders found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="text-left px-6 py-3 font-semibold">
                          Order ID
                        </th>
                        <th className="text-left px-6 py-3 font-semibold">
                          User ID
                        </th>
                        <th className="text-left px-6 py-3 font-semibold">
                          Amount
                        </th>
                        <th className="text-left px-6 py-3 font-semibold">
                          Status
                        </th>
                        <th className="text-left px-6 py-3 font-semibold">
                          Date
                        </th>
                        <th className="text-center px-6 py-3 font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold">#{order.id}</td>
                          <td className="px-6 py-4">{order.userId}</td>
                          <td className="px-6 py-4 font-semibold">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-blue-600 hover:text-blue-800 font-semibold">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
