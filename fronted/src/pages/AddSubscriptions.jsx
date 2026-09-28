import Sidebar from "../components/Sidebar";

function AddSubscriptions() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-[#171717]">
            Add Subscription
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new subscription to track your spending
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-[#E5E7EB] bg-white p-8">

          {/* Subscription Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Subscription Name
            </label>

            <input
              type="text"
              placeholder="e.g. Netflix"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>

          {/* Category */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Category
            </label>

            <select className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 outline-none focus:border-[#6246E5]">
              <option>Select category</option>
              <option>Entertainment</option>
              <option>Music</option>
              <option>Software & Productivity</option>
              <option>Cloud Storage</option>
              <option>Gaming</option>
              <option>Shopping</option>
            </select>
          </div>

          {/* Price */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Price
            </label>

            <input
              type="number"
              placeholder="e.g. 649"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>

          {/* Billing Cycle */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Billing Cycle
            </label>

            <select className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 outline-none focus:border-[#6246E5]">
              <option>Select billing cycle</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          {/* Renewal Date */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Renewal Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 outline-none focus:border-[#6246E5]"
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <button
              type="button"
              className="rounded-lg border border-[#E5E7EB] px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded-lg bg-[#6246E5] px-6 py-3 font-semibold text-white hover:bg-[#5138C9]"
            >
              Add Subscription
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

export default AddSubscriptions;