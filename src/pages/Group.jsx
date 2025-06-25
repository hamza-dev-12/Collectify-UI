import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Graph from "../components/Home/Graph";
import AddMembers from "../components/Group/AddMembers";

const Group = ({}) => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [memberId, setMemberId] = useState(null);
  const [stateMembers, setStateMembers] = useState(
    groupData ? groupData.members : []
  );
  const [showAddMemberCard, setShowAddMemberCard] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { token } = useSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    const fetchGroupById = async () => {
      try {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const url = `http://localhost:8000/api/v1/detail/group/${id}/?month=${month}&year=${year}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        //token expired
        if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const data = await response.json();

        const {
          group_name: groupName,
          group_id: groupId,
          members,
          base_amount: baseAmount,
        } = data;

        setGroupData({ groupName, groupId, members, baseAmount });
        setStateMembers(members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupById();
  }, [refreshTrigger]);

  if (!groupData) return;

  const { groupName, baseAmount } = groupData;

  const filters = ["All", "Pending", "Paid"];
  const paidMembers = stateMembers.filter((m) => m.status === "paid");
  const unpaidMembers = stateMembers.length - paidMembers.length;
  const data = [
    { name: "Paid", value: paidMembers.length * baseAmount },
    { name: "Unpaid", value: unpaidMembers * baseAmount },
  ];

  const handleStatusChange = async (memberId, status, paymentId = {}) => {
    try {
      if (status === "paid") {
        const url = `http://localhost:8000/api/v1/payment/create/${memberId}/`;

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: formattedDate,
            amount: baseAmount,
          }),
        });

        if (response.status === 401) {
          navigate("/login");
        }

        if (!response.ok) {
          console.log(response);
          throw new Error("Something went wrong");
        }

        const updatedMembers = stateMembers.map((m) => {
          return m.group_member_id === memberId ? { ...m, status: status } : m;
        });

        setStateMembers(updatedMembers);
      } else {
        const url = `http://localhost:8000/api/v1/payment/delete/${paymentId}/`;

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate("/login");
        }

        if (!response.ok) {
          throw new Error("Error deleting the payment");
        }

        const updatedMembers = stateMembers.map((m) => {
          if (m.group_member_id === memberId) {
            return {
              ...m,
              status: "pending",
            };
          }
          return m;
        });

        setStateMembers(updatedMembers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const deleteUser = async (memberId) => {
    try {
      const url = `http://localhost:8000/api/v1/member/delete/${memberId}/`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error while deleting the user");
      }

      setStateMembers((prev) => {
        return prev.filter((m) => {
          return m.group_member_id !== memberId;
        });
      });

      setMemberId(null);
    } catch (error) {
      console.error(error);
    }
  };
  if (showAddMemberCard) {
    return (
      <AddMembers
        setShowAddMemberCard={setShowAddMemberCard}
        setTotalMembers={setStateMembers}
        groupId={id}
        setRefreshTrigger={setRefreshTrigger}
      ></AddMembers>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full px-3 py-4 md:px-8 md:py-8">
      <div className="invoice max-w-md mx-auto md:max-w-3xl">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 shadow-xl border border-gray-700 md:p-6 md:mb-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm md:text-5xl">
              {groupName}
            </h2>
            <h3 className="text-gray-400 text-lg font-medium tracking-wider uppercase md:text-xl">
              Invoice Dashboard
            </h3>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2 md:w-32"></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 md:gap-6">
            <div className="bg-gray-700 rounded-lg p-3 text-center md:p-4">
              <p className="text-green-400 text-lg font-bold md:text-xl">
                {stateMembers.filter((m) => m.status === "paid").length}
              </p>
              <p className="text-gray-300 text-xs md:text-sm">Paid</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center md:p-4">
              <p className="text-yellow-400 text-lg font-bold md:text-xl">
                {stateMembers.filter((m) => m.status === "pending").length}
              </p>
              <p className="text-gray-300 text-xs md:text-sm">Pending</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center md:p-4">
              <p className="text-blue-400 text-lg font-bold md:text-xl">
                {stateMembers.length}
              </p>
              <p className="text-gray-300 text-xs md:text-sm">Total</p>
            </div>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => {
              setCounter((prev) => (prev + 1) % filters.length);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl font-semibold border border-blue-500 shadow-lg transition-all duration-200 active:scale-95 md:p-4 md:text-lg"
          >
            Filter: {filters[counter]}
          </button>
        </div>

        {/* Members List */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 mb-4 md:mb-6">
          {/* List Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-750 rounded-t-2xl border-b border-gray-600 md:px-6 md:py-4">
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center md:text-base">
              Name
            </p>
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center md:text-base">
              Status
            </p>
            <p className="text-gray-300 font-semibold text-sm flex-1 text-center md:text-base">
              Date
            </p>
          </div>

          {/* Members */}
          <div className="max-h-96 overflow-y-auto">
            {stateMembers
              .filter((m) => {
                if (filters[counter] == "All") return m;
                if (filters[counter] === "Paid" && m.status === "paid")
                  return m;
                if (filters[counter] === "Pending" && m.status === "pending")
                  return m;
              })
              .map((m, index) => (
                <div
                  key={m.group_member_id}
                  className={`flex items-center justify-between gap-2 px-4 py-4 transition-all duration-200 md:px-6 md:py-5 ${
                    index !== stateMembers.length - 1
                      ? "border-b border-gray-700"
                      : ""
                  } ${
                    m.memberId === memberId
                      ? "bg-red-900/30 border-l-4 border-red-500"
                      : "hover:bg-gray-700/50 active:bg-gray-700"
                  }`}
                  onClick={() => {
                    setMemberId(m.group_member_id);
                  }}
                >
                  <p
                    className={`flex-1 font-medium text-center ${
                      m["group_member_id"] === memberId
                        ? "text-red-400"
                        : "text-gray-100"
                    } md:text-base`}
                  >
                    {m.name}
                  </p>

                  <div className="flex-1 px-2 md:px-4">
                    <select
                      value={m.status}
                      onChange={(e) => {
                        setMemberId(m.group_member_id);
                        handleStatusChange(
                          m.group_member_id,
                          e.target.value,
                          m.payment ? m.payment.payment_id : null
                        );
                      }}
                      className={`w-full text-center font-semibold text-sm px-2 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all md:text-base md:py-2 ${
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

                  <p className="flex-1 text-gray-300 text-center text-sm md:text-base">
                    {m.payment ? m.payment.date : "DD-MM-YY"}
                  </p>
                </div>
              ))}
          </div>

          {/* Delete Button */}
          {memberId && (
            <div className="p-4 bg-gray-750 rounded-b-2xl border-t border-gray-600 md:p-5">
              <button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-xl font-semibold border border-red-500 shadow-lg transition-all duration-200 active:scale-95 md:p-4 md:text-lg"
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
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 shadow-xl border border-gray-700 md:p-6 md:mb-6">
          <h3 className="text-gray-400 text-lg font-semibold mb-4 text-center md:text-xl md:mb-6">
            Payment Analytics
          </h3>
          <Graph data={data} />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6 md:space-y-4 md:mb-8">
          <button
            onClick={() => setShowAddMemberCard(true)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-xl font-semibold border border-green-500 shadow-lg transition-all duration-200 active:scale-95 md:p-4 md:text-lg"
          >
            Add New Member
          </button>

          <button
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-3 rounded-xl font-semibold border border-orange-500 shadow-lg transition-all duration-200 active:scale-95 md:p-4 md:text-lg"
            onClick={() => {
              navigate(`/smart-chat/${id}`);
            }}
          >
            Smart Chat
          </button>
        </div>

        {/* Back Button */}
        <button
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold p-3 rounded-xl shadow-lg transition-all duration-200 active:scale-95 md:p-4 md:text-lg"
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
