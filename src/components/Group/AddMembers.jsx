import { useState } from "react";

const AddMembers = ({ setShowAddMemberCard, setTotalMembers }) => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    id: Date.now().toString(),
    date: new Date().toLocaleString("en-GB"),
    status: "pending",
  });

  const handleAddMember = (field, value) => {
    setMember((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  return (
    <section className="grid items-center h-full">
      <form className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Member
        </h2>

        <input
          type="email"
          placeholder="hamza@example.com"
          className="bg-card inline-block p-2 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            handleAddMember("email", e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="User Name"
          className="bg-card inline-block p-2 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            handleAddMember("name", e.target.value);
          }}
        />

        <button
          type="submit"
          className="block bg-blue-600 text-white p-2 w-1/2 rounded-lg hover:bg-blue-700 transition mx-auto mt-4"
          onClick={(e) => {
            e.preventDefault();
            setTotalMembers((prev) => [...prev, member]);
            setShowAddMemberCard(false);
          }}
        >
          Add Member
        </button>
        <button
          type="button"
          className="block bg-red-600 text-white p-2 w-1/2 rounded-lg hover:bg-red-700 transition mx-auto mt-4"
          onClick={(e) => {
            e.preventDefault();
            setShowAddMemberCard((prev) => !prev);
          }}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddMembers;
