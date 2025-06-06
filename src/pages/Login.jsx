import { useNavigate, Link } from "react-router-dom";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  return (
    <section className="grid items-center h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-lg">Sign in to your account</p>
      </div>

      <form className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">
        <input
          type="email"
          placeholder="hamza@example.com"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-gray-50 p-4 mt-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold p-4 rounded-xl shadow-lg border border-blue-500 transition-all duration-200 active:scale-95 mx-auto mt-6"
          onClick={(e) => {
            e.preventDefault();
            setLogin(true);
            navigate("/home");
          }}
        >
          Login
        </button>
        <Link
          to="/signup"
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold p-4 rounded-xl shadow-lg border border-green-500 transition-all duration-200 active:scale-95 mx-auto mt-6 inline-block"
        >
          Signup
        </Link>
      </form>
    </section>
  );
};

export default Login;
