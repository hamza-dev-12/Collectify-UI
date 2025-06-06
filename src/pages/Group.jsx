import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "../components/Home/Graph";
import AddMembers from "../components/Group/AddMembers";

const Group = ({ groupData }) => {
  const navigate = useNavigate();

  const { groupName, groupId, members, baseAmount } = groupData;

  const name = "Muhammad Hamza";

  const [counter, setCounter] = useState(0);
  const [memberId, setMemberId] = useState(null);
  const [stateMembers, setStateMembers] = useState(members);
  const [showAddMemberCard, setShowAddMemberCard] = useState(false);

  const filters = ["All", "Pending", "Paid"];

  const paidMembers = stateMembers.filter((m) => m.status === "paid");
  const unpaidMembers = stateMembers.length - paidMembers.length;

  const data = [
    { name: "Paid", value: paidMembers.length * baseAmount },
    { name: "Unpaid", value: unpaidMembers * baseAmount },
  ];

  const handleStatusChange = (memberId, status) => {
    const updatedMembers = stateMembers.map((m) => {
      return m.memberId === memberId ? { ...m, status: status } : m;
    });

    setStateMembers(updatedMembers);
  };

  const deleteUser = (memberId) => {
    const updateMembers = stateMembers.filter((m) => m.memberId !== memberId);

    setStateMembers(updateMembers);
    setMemberId(null);
  };

  if (showAddMemberCard) {
    return (
      <AddMembers
        setShowAddMemberCard={setShowAddMemberCard}
        setTotalMembers={setStateMembers}
      ></AddMembers>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full px-3 py-4">
      <div className="invoice max-w-md mx-auto">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 shadow-xl border border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
              {groupName}
            </h2>
            <h3 className="text-gray-400 text-lg font-medium tracking-wider uppercase">
              Invoice Dashboard
            </h3>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2"></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-green-400 text-lg font-bold">
                {stateMembers.filter((m) => m.status === "paid").length}
              </p>
              <p className="text-gray-300 text-xs">Paid</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-yellow-400 text-lg font-bold">
                {stateMembers.filter((m) => m.status === "pending").length}
              </p>
              <p className="text-gray-300 text-xs">Pending</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-blue-400 text-lg font-bold">
                {stateMembers.length}
              </p>
              <p className="text-gray-300 text-xs">Total</p>
            </div>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-4">
          <button
            onClick={() => {
              setCounter((prev) => (prev + 1) % filters.length);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl font-semibold border border-blue-500 shadow-lg transition-all duration-200 active:scale-95"
          >
            Filter: {filters[counter]}
          </button>
        </div>

        {/* Members List */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 mb-4">
          {/* List Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-750 rounded-t-2xl border-b border-gray-600">
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center">
              Name
            </p>
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center">
              Status
            </p>
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center">
              Date
            </p>
          </div>

          {/* Members */}
          <div className="max-h-96 overflow-y-auto">
            {stateMembers.map((m, index) => (
              <div
                key={m.memberId}
                className={`flex items-center justify-between gap-2 px-4 py-4 transition-all duration-200 ${
                  index !== stateMembers.length - 1
                    ? "border-b border-gray-700"
                    : ""
                } ${
                  m.memberId === memberId
                    ? "bg-red-900/30 border-l-4 border-red-500"
                    : "hover:bg-gray-700/50 active:bg-gray-700"
                }`}
                onClick={() => {
                  setMemberId(m.memberId);
                }}
              >
                <p
                  className={`flex-1 font-medium text-center ${
                    m.memberId === memberId ? "text-red-400" : "text-gray-100"
                  }`}
                >
                  {name}
                </p>

                <div className="flex-1 px-2">
                  <select
                    value={m.status}
                    onChange={(e) => {
                      console.log(m.memberId);
                      setMemberId(m.memberId);
                      handleStatusChange(m.memberId, e.target.value);
                    }}
                    className={`w-full text-center font-semibold text-sm px-2 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all ${
                      m.status === "paid"
                        ? "bg-green-600 text-white focus:ring-green-400"
                        : "bg-yellow-500 text-yellow-900 focus:ring-yellow-400"
                    }`}
                  >
                    <option
                      value="pending"
                      className="text-yellow-900 bg-white"
                    >
                      Pending
                    </option>
                    <option value="paid" className="text-green-900 bg-white">
                      Paid
                    </option>
                  </select>
                </div>

                <p className="flex-1 text-gray-300 text-center text-sm">
                  {m.date ? m.date : "DD-MM-YY"}
                </p>
              </div>
            ))}
          </div>

          {/* Delete Button */}
          {memberId && (
            <div className="p-4 bg-gray-750 rounded-b-2xl border-t border-gray-600">
              <button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-xl font-semibold border border-red-500 shadow-lg transition-all duration-200 active:scale-95"
                onClick={() => {
                  deleteUser(memberId);
                }}
              >
                Delete Selected Member
              </button>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 shadow-xl border border-gray-700">
          <h3 className="text-gray-400 text-lg font-semibold mb-4 text-center">
            Payment Analytics
          </h3>
          <Graph data={data} />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setShowAddMemberCard(true)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-xl font-semibold border border-green-500 shadow-lg transition-all duration-200 active:scale-95"
          >
            Add New Member
          </button>

          <button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-3 rounded-xl font-semibold border border-orange-500 shadow-lg transition-all duration-200 active:scale-95">
            Send Reminders
          </button>
        </div>

        {/* Back Button */}
        <button
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold p-3 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
          onClick={() => {
            navigate("/home");
          }}
        >
          ← Back to Home
        </button>
      </div>
    </section>
  );
};

export default Group;
