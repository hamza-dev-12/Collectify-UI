import { useState } from "react";
import { useNavigate } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeInput = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleSignUpForm = async () => {
    try {
      const { email, password, confirmPassword } = formData;

      if (!password || !confirmPassword || !email) {
        throw new Error("Please fill out all the form");
      }

      if (password !== confirmPassword) {
        throw new Error("Password does not match");
      }

      if (
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword
      ) {
        const url = `https://collectify-apis.vercel.app/api/v1/user/signup/`;
        setLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email.split("@")[0],
            email,
            password,
          }),
        });
        await delay(2000);
        if (!response.ok) {
          throw new Error(
            "Couldnt create an account. Please try another valid email!"
          );
        }
      }
      handleChangeInput("email", "");
      handleChangeInput("password", "");
      handleChangeInput("confirmPassword", "");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
          value={formData.email}
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("email", e.target.value);
          }}
          onClick={() => setError("")}
        />
        <input
          type="password"
          placeholder="••••••••"
          value={formData.password}
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("password", e.target.value);
          }}
          onClick={() => setError("")}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          onChange={(e) => {
            e.preventDefault();
            handleChangeInput("confirmPassword", e.target.value);
          }}
          onClick={() => setError("")}
        />
        {<p className="mt-2 text-red-400">{error}</p>}
        <button
          type="submit"
          className={`w-full font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 mx-auto mt-6 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border border-green-500 active:scale-95"
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (!loading) {
              handleSignUpForm();
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing up...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </section>
  );
};

export default Signup;
