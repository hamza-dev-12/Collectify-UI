import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Overview = ({ data, name, setShowGroup, setGroupData, setTrigger }) => {
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [formData, setFormData] = useState({
    groupName: "",
    groupId: Date.now().toString(),
    baseAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const { user_id: userId } = data;
  data = data.groups;

  const handleChangeInput = (field, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  const handleSubmitGroupForm = async () => {
    try {
      const url = `http://localhost:8000/api/v1/group/create/`;
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          admin: userId,
          group_name: formData.groupName,
          base_amount: formData.baseAmount,
        }),
      });
      delay(2000);
      if (!response.ok) {
        throw new Error("Something went wrong while creating a group");
      }
      setShowAddGroupForm(false);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background px-4 py-6">
      <div className="text-3xl font-bold text-gray-900 mb-8 text-center py-6 border-b-2 border-gray-200">
        Welcome{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {name[0].toUpperCase() + name.substring(1, name.length)}
        </span>
        !
      </div>
      <ul className="space-y-8">
        {data.length > 0 &&
          data.map((d) => {
            const paidCount = d.members.filter(
              (m) => m.status === "paid"
            ).length;
            return (
              <Link to={`/group/${d.id}`} key={d.id}>
                <li
                  className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-98 mt-4"
                  onClick={(e) => {
                    setGroupData(d);
                    setShowGroup(Number(d.id));
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900 truncate mr-4">
                      {d.group_name}
                    </h2>
                    <span
                      className={`text-sm font-semibold px-4 py-2 rounded-full shadow-sm w-1/3 ${
                        paidCount === d.members.length
                          ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                          : "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                      }`}
                    >
                      {paidCount}/{d.members.length} paid
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600">
                      {d.members.length} member
                      {d.members.length !== 1 ? "s" : ""}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            paidCount === d.members.length
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                          }`}
                          style={{
                            width: `${
                              d.members.length > 0
                                ? (paidCount / d.members.length) * 100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {d.members.length > 0
                          ? Math.round((paidCount / d.members.length) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
      <button
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-xl w-14 h-14 mx-auto block mt-8 rounded-full shadow-lg border-2 border-green-500 transition-all duration-200 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
        onClick={() => {
          setShowAddGroupForm((prev) => !prev);
        }}
      >
        +
      </button>
      {showAddGroupForm && (
        <section className="grid items-center h-full mt-4">
          <form className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                Add New Group
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto"></div>
            </div>

            <input
              type="text"
              placeholder="Group Name"
              className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
              onChange={(e) => {
                e.preventDefault();
                handleChangeInput("groupName", e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Base Amount"
              className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
              onChange={(e) => {
                e.preventDefault();
                handleChangeInput("baseAmount", e.target.value);
              }}
            />

            <button
              type="submit"
              className={`mt-4 w-full font-bold p-4 rounded-xl shadow-xl border-2 transition-all duration-300 transform relative overflow-hidden group ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-600 border-gray-300"
                  : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white hover:shadow-2xl border-blue-400 hover:border-blue-300 active:scale-95 hover:-translate-y-1"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (!loading) {
                  handleSubmitGroupForm();
                }
              }}
              disabled={loading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Group...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Group
                  </>
                )}
              </span>
            </button>
            <button
              type="button"
              className="mt-4 w-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white font-bold p-4 rounded-xl shadow-xl hover:shadow-2xl border-2 border-gray-400 hover:border-red-400 transition-all duration-300 active:scale-95 transform hover:-translate-y-1 relative overflow-hidden group mt-3"
              onClick={(e) => {
                e.preventDefault();
                setShowAddGroupForm((prev) => !prev);
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </span>
            </button>
          </form>
        </section>
      )}
    </section>
  );
};

export default Overview;
