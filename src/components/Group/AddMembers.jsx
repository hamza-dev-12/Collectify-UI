import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddMembers = ({
  setShowAddMemberCard,
  setTotalMembers,
  groupId,
  setRefreshTrigger,
}) => {
  const [member, setMember] = useState({
    name: "",
    email: "",
  });

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddMember = (field, value) => {
    try {
      setMember((prev) => {
        return {
          ...prev,
          [field]: value,
        };
      });
    } catch (error) {}
  };

  const submitAddMember = async () => {
    try {
      const url = `https://collectify-apis.vercel.app/api/v1/member/create/${groupId}/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          member_name: member.name,
          email: member.email,
        }),
      });

      if (response.status === 401) {
        navigate("/login");
      }

      if (!response.ok) {
        console.log(response);
        throw new Error("error addding new member");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshTrigger((prev) => prev + 1);
    }
  };
  return (
    <section className="grid items-center h-full">
      <form className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Member
        </h2>
        <section className="md:grid md:grid-cols-1 md:w-1/4 md:mx-auto md:h-[7rem]">
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
        </section>

        <button
          type="submit"
          className="block bg-blue-600 text-white p-2 w-1/2 rounded-lg hover:bg-blue-700 transition mx-auto mt-4 md:w-1/5"
          onClick={(e) => {
            e.preventDefault();
            submitAddMember();
            setTotalMembers((prev) => [...prev, member]);
            setShowAddMemberCard(false);
          }}
        >
          Add Member
        </button>
        <button
          type="button"
          className="block bg-red-600 text-white p-2 w-1/2 rounded-lg hover:bg-red-700 transition mx-auto mt-4 md:w-1/5"
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
