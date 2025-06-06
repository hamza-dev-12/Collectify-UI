import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();

  const handleChangeInput = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleSignUpForm = () => {
    const { email, password, confirmPassword } = formData;

    if (email && password && confirmPassword && password === confirmPassword) {
      console.log("sucessful");
      navigate("/login");
    }
  };

  return (
    <section className="grid items-center h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 text-lg">Join us today and get started</p>
      </div>

      <form className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">
        <input
          type="email"
          placeholder="hamza@example.com"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("email", e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("password", e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("confirmPassword", e.target.value);
          }}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold p-4 rounded-xl shadow-lg border border-green-500 transition-all duration-200 active:scale-95 mx-auto mt-6"
          onClick={(e) => {
            e.preventDefault();
            handleSignUpForm();
            // Add your signup logic here
          }}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Signup;
