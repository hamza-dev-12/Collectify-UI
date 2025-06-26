import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [monthOption, setMonthOption] = useState("Current Month");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    try {
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      const date = new Date();
      const month =
        monthOption === "Current Month" ? date.getMonth() + 1 : date.getMonth();
      const year = date.getFullYear();

      // Simulate delay from backend
      const url = `https://collectify-apis.vercel.app/api/v1/chat/${id}/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: userMessage["content"],
          month,
          year,
        }),
      });

      if (response.status === 401) {
        navigate("/login");
        throw new Error("unahtorize access");
      }

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong");
      }

      const data = await response.json();
      const botMessage = { role: "assistant", content: data["message"] };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(String(error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full px-3 py-4 md:px-8 md:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header and Selector */}
        <div className="bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-700 md:p-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow mb-4">
            Chat Assistant
          </h2>

          <div className="flex justify-center gap-4">
            {["Current Month", "Previous Month"].map((option) => (
              <button
                key={option}
                onClick={() => setMonthOption(option)}
                className={`px-4 py-2 rounded-xl font-semibold border transition-all duration-200 active:scale-95
                  ${
                    monthOption === option
                      ? "bg-blue-600 text-white border-blue-400"
                      : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-700 max-h-[60vh] overflow-y-auto md:p-6">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm md:text-base shadow-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm md:text-base shadow-md bg-gray-700 text-gray-400 rounded-bl-none animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-3/4"
            placeholder="Ask a question..."
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold border border-blue-500 shadow-lg transition-all duration-200  inline-block"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
