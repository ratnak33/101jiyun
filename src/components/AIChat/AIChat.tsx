import { useEffect, useRef, useState } from "react";
import { sendMessageToAI } from "../../services/aiService";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "ai";
  text: string;
}

const AIChat = () => {
  const { i18n, t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const aiResponse = await sendMessageToAI(
      input,
      i18n.language as "en" | "zh"
    );

    setLoading(false);

    typeWriterEffect(aiResponse);
  };

  // ✅ Premium typing effect
  const typeWriterEffect = (text: string) => {
    let index = 0;

    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    const interval = setInterval(() => {
      index++;

      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        updated[lastIndex] = {
          role: "ai",
          text: text.slice(0, index)
        };

        return updated;
      });

      if (index >= text.length) clearInterval(interval);
    }, 15);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[28rem] bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="p-3 bg-black text-white rounded-t-2xl text-sm font-medium tracking-wide">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] break-words whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-100 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
              rows={1}
              placeholder={t("chat.placeholder")}
            />

            <button
              onClick={handleSend}
              className="bg-black text-white px-4 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
