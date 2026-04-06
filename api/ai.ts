import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { message, lang } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                lang === "zh"
                  ? "你是一個物流助手，請用中文回答"
                  : "You are a logistics assistant. Answer in English."
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    // 🔍 Debug log (helps if anything breaks)
    console.log("FULL API RESPONSE:", JSON.stringify(data, null, 2));

    // ❌ If API returns error
    if (data.error) {
      console.error("API ERROR:", data.error);
      return res.status(200).json({
        reply: "AI service error. Please try again later."
      });
    }

    // ❌ If structure is unexpected
    if (!data?.choices || !data.choices.length) {
      console.error("INVALID RESPONSE STRUCTURE:", data);
      return res.status(200).json({
        reply: "No response from AI. Try again."
      });
    }

    // ✅ Safe extraction
    const reply = data.choices[0]?.message?.content || "No response";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      reply: "Server error. Please try again."
    });
  }
}
