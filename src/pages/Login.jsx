import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../components/auth/authSlice";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = ({ setUserId }) => {
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeValue = (key, value) => {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const url = "https://collectify-apis.vercel.app/api/v1/user/login/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError("Email or password is incorrect");
        await delay(2000);
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      const access_token = data["access"];
      const userId = data["user_id"];

      dispatch(
        loginSuccess({
          userId: userId,
          token: access_token,
        })
      );
      setUserId(userId);
      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid items-center h-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-lg">Sign in to your account</p>
      </div>

      <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">
        <input
          type="email"
          placeholder="hamza@example.com"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          onChange={(e) => {
            handleChangeValue("email", e.target.value);
          }}
          onClick={() => setError("")}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          onChange={(e) => handleChangeValue("password", e.target.value)}
          onClick={() => setError("")}
          disabled={loading}
        />
        {error && <p className="mt-2 text-red-400">{error}</p>}

        <button
          type="button"
          className={`w-full font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 mx-auto mt-6 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border border-blue-500 active:scale-95"
          }`}
          onClick={() => {
            if (!loading) {
              handleLogin();
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            "Login"
          )}
        </button>

        <button
          type="button"
          className={`w-full font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 mx-auto mt-6 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border border-green-500 active:scale-95"
          }`}
          disabled={loading}
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </section>
  );
};

export default Login;
