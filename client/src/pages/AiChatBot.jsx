import { useState } from "react";
import { aiService } from "../services/aiService";
import { IoSend } from "react-icons/io5";
import { FaRobot, FaUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const AiChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPrompt = prompt.trim();
    if (!currentPrompt) return;

    const userMessage = {
      role: "user",
      text: currentPrompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await aiService(currentPrompt);

      const aiMessage = {
        role: "ai",
        text: res?.data || "AI response not found",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: error.message || "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen w-full bg-transparent px-3 py-4 sm:px-4 sm:py-6">
      
    //   <div className="mx-auto flex h-[90vh] w-full flex-col overflow-hidden rounded-3xl border border-orange-500/20 bg-white shadow-2xl sm:h-[88vh] md:w-[90%] lg:w-[70%] xl:w-[40%] 2xl:w-[30%]">
        <div className="h-full w-full bg-transparent p-0 sm:px-3 sm:py-4">
  <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-none border-0  sm:rounded-2xl sm:border sm:border-orange-500/20 ">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 text-white sm:gap-4 sm:px-6 sm:py-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 sm:h-14 sm:w-14">
            <FaRobot size={24} className="sm:text-[28px]" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold sm:text-xl">
              AI Chat Assistant
            </h2>
            <p className="text-xs text-orange-100 sm:text-sm">
              Ask anything and get instant answers
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-orange-50 p-4 sm:space-y-5 sm:p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500 sm:h-20 sm:w-20">
                <FaRobot size={32} className="sm:text-[38px]" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                Welcome to AI Assistant
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Type your question below and let AI help you.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 sm:gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md sm:h-10 sm:w-10">
                  <FaRobot size={16} className="sm:text-[18px]" />
                </div>
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:px-5 ${
                  msg.role === "user"
                    ? "rounded-br-md bg-black text-white"
                    : "rounded-bl-md border border-orange-100 bg-white text-gray-800"
                }`}
              >
                {msg.text}
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-md sm:h-10 sm:w-10">
                  <FaUser size={14} className="sm:text-[16px]" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-md sm:h-10 sm:w-10">
                <FaRobot size={16} className="sm:text-[18px]" />
              </div>

              <div className="flex items-center gap-2 rounded-3xl rounded-bl-md border border-orange-100 bg-white px-4 py-3 text-sm text-gray-500 shadow-sm sm:px-5">
                <FiLoader className="animate-spin text-orange-500" />
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-orange-100 bg-white p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 sm:gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:px-3"
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 sm:h-11 sm:w-11"
            >
              {loading ? (
                <FiLoader className="animate-spin" size={18} />
              ) : (
                <IoSend size={18} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiChatBot;
