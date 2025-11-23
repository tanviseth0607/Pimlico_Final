import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Search,
  Filter,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  sales: number;
  rating: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  customer: string;
}

export default function RetailerDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "inventory" | "orders" | "analytics">("dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Organic Apples",
      price: 150,
      stock: 45,
      category: "Fresh Produce",
      sales: 234,
      rating: 4.8,
      image: "🍎",
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      price: 45,
      stock: 12,
      category: "Bakery",
      sales: 128,
      rating: 4.6,
      image: "🍞",
    },
    {
      id: 3,
      name: "Fresh Tomatoes - 1kg",
      price: 60,
      stock: 30,
      category: "Fresh Produce",
      sales: 89,
      rating: 4.7,
      image: "🍅",
    },
    {
      id: 4,
      name: "Milk - 1 Liter",
      price: 55,
      stock: 100,
      category: "Dairy",
      sales: 567,
      rating: 4.9,
      image: "🥛",
    },
  ];

  const orders: Order[] = [
    { id: "#ORD-001", date: "Today", items: 3, total: 450, status: "pending", customer: "John Doe" },
    { id: "#ORD-002", date: "Yesterday", items: 2, total: 320, status: "completed", customer: "Jane Smith" },
    { id: "#ORD-003", date: "2 days ago", items: 5, total: 680, status: "completed", customer: "Mike Johnson" },
  ];

  const stats = [
    { label: "Total Revenue", value: "₹45,230", change: "+12.5%", icon: TrendingUp, color: "text-primary" },
    { label: "Total Orders", value: "156", change: "+8.2%", icon: ShoppingCart, color: "text-accent" },
    { label: "Active Products", value: "24", change: "+3", icon: Package, color: "text-success" },
    { label: "Customers", value: "892", change: "+5.1%", icon: Users, color: "text-info" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container-wide py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-secondary">Retailer Dashboard</h1>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="container-wide py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {["dashboard", "inventory", "orders", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-primary"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-slate-100 ${stat.color}`}>
                        <StatIcon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-success">{stat.change}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-secondary">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-600">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-600">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-600">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-600">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-semibold text-secondary">{order.id}</td>
                        <td className="py-3 px-4 text-slate-600">{order.customer}</td>
                        <td className="py-3 px-4 text-slate-600">{order.items} items</td>
                        <td className="py-3 px-4 font-bold text-primary">₹{order.total}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "completed"
                                ? "bg-success/20 text-success"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
              <>
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAddProduct(false)} />
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6">
                    <h3 className="text-2xl font-bold text-secondary mb-4">Add New Product</h3>
                    <div className="space-y-4 mb-6">
                      <input placeholder="Product Name" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none" />
                      <input placeholder="Price (₹)" type="number" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none" />
                      <input placeholder="Stock Quantity" type="number" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none" />
                      <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none">
                        <option>Select Category</option>
                        <option>Fresh Produce</option>
                        <option>Dairy</option>
                        <option>Bakery</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowAddProduct(false)}
                        className="flex-1 py-2 border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowAddProduct(false)}
                        className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="text-5xl mb-4">{product.image}</div>
                  <h4 className="font-bold text-secondary mb-2">{product.name}</h4>
                  <p className="text-sm text-slate-600 mb-4">{product.category}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4 py-4 border-y border-slate-200">
                    <div>
                      <p className="text-xs text-slate-600">Price</p>
                      <p className="font-bold text-primary">₹{product.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Stock</p>
                      <p className={`font-bold ${product.stock < 20 ? "text-warning" : "text-success"}`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-secondary mb-6">All Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Items</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-secondary">{order.id}</td>
                      <td className="py-3 px-4 text-slate-600">{order.customer}</td>
                      <td className="py-3 px-4 text-slate-600">{order.date}</td>
                      <td className="py-3 px-4 text-slate-600">{order.items} items</td>
                      <td className="py-3 px-4 font-bold text-primary">₹{order.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "completed"
                              ? "bg-success/20 text-success"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary font-semibold hover:underline text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-4">Top Selling Products</h3>
              <div className="space-y-4">
                {products
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 4)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-secondary">{product.name}</p>
                        <p className="text-sm text-slate-600">{product.sales} sales</p>
                      </div>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(product.sales / 567) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-4">Customer Ratings</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <p className="font-semibold text-secondary text-sm">{product.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? "text-accent" : "text-slate-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="font-bold text-secondary">{product.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
