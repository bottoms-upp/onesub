 import { useState } from "react";
 import Sidebar from "../components/Sidebar";

function Subscriptions() {
  const [search, setSearch] = useState("");

  const subscriptions = [
    {
      name: "YouTube Premium",
      category: "Entertainment",
      price: "₹149",
      cycle: "/month",
      renewal: "Sep 06",
      status: "Active",
    },
    {
      name: "Netflix",
      category: "Entertainment",
      price: "₹649",
      cycle: "/month",
      renewal: "Sep 06",
      status: "Renewing Soon",
    },
    {
      name: "Spotify",
      category: "Music",
      price: "₹119",
      cycle: "/month",
      renewal: "Sep 09",
      status: "Paused",
    },
    {
      name: "Amazon Prime Video",
      category: "Entertainment",
      price: "₹1,499",
      cycle: "/year",
      renewal: "Oct 16",
      status: "Cancelled",
    },
  ];

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.name.toLowerCase().includes(search.toLowerCase()) ||
    subscription.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="flex min-h-screen bg-[#FAFAFA]">
    
    <Sidebar />

    <main className="flex-1 p-8">
      
      {/* your existing Subscriptions page code */}
 

   
  

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#171717]">
            My Subscriptions
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your subscriptions
          </p>
        </div>

        <button className="rounded-lg bg-[#6246E5] px-5 py-3 font-semibold text-white hover:bg-[#5138C9]">
          + Add Subscription
        </button>
      </div>

      {/* Search + View All */}
      <div className="mt-8 flex items-center justify-between">

        {/* Search */}
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
          </span>

          <input
            type="text"
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 outline-none focus:border-[#6246E5]"
          />
        </div>

        {/* View All */}
        <select className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none">
          <option>View all</option>
          <option>Active</option>
          <option>Renewing Soon</option>
          <option>Paused</option>
          <option>Cancelled</option>
        </select>

      </div>

      {/* Subscription List */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">

        {/* Table Header */}
        <div className="grid grid-cols-5 bg-[#EEF1FA] px-6 py-4 text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Renewal</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((subscription) => (
            <div
              key={subscription.name}
              className="grid grid-cols-5 items-center border-t border-[#E5E7EB] px-6 py-6"
            >

              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E7FF] text-sm font-bold text-[#6246E5]">
                  {subscription.name.charAt(0)}
                </div>

                <span className="font-medium text-[#171717]">
                  {subscription.name}
                </span>
              </div>

              {/* Category */}
              <div className="text-sm text-gray-600">
                {subscription.category}
              </div>

              {/* Price */}
              <div className="text-sm font-medium text-[#171717]">
                {subscription.price}
                <span className="font-normal text-gray-500">
                  {subscription.cycle}
                </span>
              </div>

              {/* Renewal */}
              <div className="text-sm text-gray-600">
                {subscription.renewal}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    subscription.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : subscription.status === "Renewing Soon"
                      ? "bg-orange-100 text-orange-700"
                      : subscription.status === "Paused"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subscription.status}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="px-6 py-10 text-center text-gray-500">
            No subscriptions found.
          </div>
        )}

      </div>
        </main>

    </div>
  );
}

export default Subscriptions;