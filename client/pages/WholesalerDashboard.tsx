import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  ShoppingCart,
  Settings,
  Package,
  Search,
  Eye,
  DollarSign,
  Truck,
} from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  costPrice: number;
  retailPrice: number;
  stock: number;
  category: string;
  image: string;
}

interface RetailerOrder {
  id: string;
  retailer: string;
  date: string;
  items: number;
  amount: number;
  status: "pending" | "shipped" | "delivered";
}

interface Retailer {
  id: number;
  name: string;
  location: string;
  contact: string;
  orders: number;
  totalSpent: number;
}

export default function WholesalerDashboard() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "inventory" | "retailers" | "orders" | "analytics"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const inventory: InventoryItem[] = [
    {
      id: 1,
      name: "Fresh Organic Apples",
      costPrice: 100,
      retailPrice: 150,
      stock: 500,
      category: "Fresh Produce",
      image: "🍎",
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      costPrice: 30,
      retailPrice: 45,
      stock: 200,
      category: "Bakery",
      image: "🍞",
    },
    {
      id: 3,
      name: "Milk - 1 Liter",
      costPrice: 40,
      retailPrice: 55,
      stock: 1000,
      category: "Dairy",
      image: "🥛",
    },
  ];

  const retailers: Retailer[] = [
    {
      id: 1,
      name: "Fresh Farm Supplies",
      location: "Downtown Market",
      contact: "+91 9876543210",
      orders: 45,
      totalSpent: 125000,
    },
    {
      id: 2,
      name: "Green Valley Mart",
      location: "North District",
      contact: "+91 9876543211",
      orders: 32,
      totalSpent: 98500,
    },
    {
      id: 3,
      name: "City Fresh Store",
      location: "Central Area",
      contact: "+91 9876543212",
      orders: 28,
      totalSpent: 75800,
    },
  ];

  const orders: RetailerOrder[] = [
    {
      id: "#WHL-001",
      retailer: "Fresh Farm Supplies",
      date: "Today",
      items: 150,
      amount: 45000,
      status: "pending",
    },
    {
      id: "#WHL-002",
      retailer: "Green Valley Mart",
      date: "Yesterday",
      items: 120,
      amount: 35600,
      status: "shipped",
    },
    {
      id: "#WHL-003",
      retailer: "City Fresh Store",
      date: "2 days ago",
      items: 100,
      amount: 29800,
      status: "delivered",
    },
  ];

  const stats = [
    {
      label: "Total Revenue",
      value: "₹299,300",
      change: "+18.5%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "Active Retailers",
      value: "45",
      change: "+12",
      icon: Users,
      color: "text-accent",
    },
    {
      label: "Pending Orders",
      value: "8",
      change: "-2",
      icon: ShoppingCart,
      color: "text-warning",
    },
    {
      label: "Total Stock",
      value: "1,700 units",
      change: "+5%",
      icon: Package,
      color: "text-success",
    },
  ];

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container-wide py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-secondary">
            Wholesaler Dashboard
          </h1>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="container-wide py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {["dashboard", "inventory", "retailers", "orders", "analytics"].map(
            (tab) => (
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
            ),
          )}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-slate-100 ${stat.color}`}
                      >
                        <StatIcon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-sm font-bold ${stat.change.startsWith("+") ? "text-success" : "text-warning"}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-secondary">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders from Retailers */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-6">
                Recent Retailer Orders
              </h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-bold text-secondary">
                        {order.retailer}
                      </p>
                      <p className="text-sm text-slate-600">
                        {order.items} units • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">
                        ₹{order.amount.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-success/20 text-success"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Retailers */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-6">
                Top Retailers
              </h3>
              <div className="space-y-3">
                {retailers.map((retailer) => (
                  <div
                    key={retailer.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-bold text-secondary">
                        {retailer.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {retailer.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ₹{retailer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-600">
                        {retailer.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map((item) => {
                const markup = (
                  ((item.retailPrice - item.costPrice) / item.costPrice) *
                  100
                ).toFixed(0);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                  >
                    <div className="text-5xl mb-4">{item.image}</div>
                    <h4 className="font-bold text-secondary mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      {item.category}
                    </p>

                    <div className="space-y-3 mb-4 py-4 border-y border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cost Price</span>
                        <span className="font-bold">₹{item.costPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Retail Price</span>
                        <span className="font-bold text-primary">
                          ₹{item.retailPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Markup</span>
                        <span className="font-bold text-success">
                          {markup}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Stock</span>
                        <span
                          className={`font-bold ${item.stock < 300 ? "text-warning" : "text-success"}`}
                        >
                          {item.stock} units
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 text-sm font-semibold">
                        <Edit className="w-4 h-4 mx-auto" />
                      </button>
                      <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-semibold">
                        Update Stock
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Retailers Tab */}
        {activeTab === "retailers" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-secondary">
                Managed Retailers
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Retailer Name
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Location
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Contact
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Orders
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Total Spent
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {retailers.map((retailer, idx) => (
                    <tr
                      key={retailer.id}
                      className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                    >
                      <td className="py-4 px-6 font-semibold text-secondary">
                        {retailer.name}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {retailer.location}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {retailer.contact}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {retailer.orders}
                      </td>
                      <td className="py-4 px-6 font-bold text-primary">
                        ₹{retailer.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-primary font-semibold hover:underline text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-secondary mb-6">
              All Retailer Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Retailer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Units
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-semibold text-secondary">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.retailer}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{order.date}</td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.items} units
                      </td>
                      <td className="py-3 px-4 font-bold text-primary">
                        ₹{order.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-success/20 text-success"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary font-semibold hover:underline text-sm">
                          Update
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
              <h3 className="text-xl font-bold text-secondary mb-4">
                Sales by Category
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Fresh Produce", amount: 125000, percent: 45 },
                  { name: "Dairy", amount: 98500, percent: 35 },
                  { name: "Bakery", amount: 75800, percent: 20 },
                ].map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-secondary">
                        {cat.name}
                      </span>
                      <span className="font-bold text-primary">
                        ₹{cat.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${cat.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-secondary mb-4">
                Retailer Performance
              </h3>
              <div className="space-y-4">
                {retailers.map((retailer) => (
                  <div key={retailer.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-secondary text-sm">
                        {retailer.name}
                      </span>
                      <span className="font-bold text-primary text-sm">
                        {Math.round((retailer.totalSpent / 299300) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{
                          width: `${(retailer.totalSpent / 299300) * 100}%`,
                        }}
                      />
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
