import { useState } from "react";
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

  // ✨ Typing Effect
  const typeWriterEffect = (text: string) => {
    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
      currentText += text[index];
      index++;

      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (last?.role === "ai") {
          return [...prev.slice(0, -1), { role: "ai", text: currentText }];
        }

        return [...prev, { role: "ai", text: currentText }];
      });

      if (index === text.length) clearInterval(interval);
    }, 20);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col">
          {/* Header */}
          <div className="p-3 bg-black text-white rounded-t-xl">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] break-words whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loading */}
            {loading && <div className="text-gray-500 text-sm">Typing...</div>}
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 border rounded px-2 py-1 text-sm resize-none"
              rows={1}
              placeholder={t("chat.placeholder")}
            />
            <button
              onClick={handleSend}
              className="bg-black text-white px-3 rounded"
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
