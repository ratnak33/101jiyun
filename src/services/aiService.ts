import axios from "axios";

export const sendMessageToAI = async (message: string, lang: "en" | "zh") => {
  try {
    const res = await axios.post("/api/ai", {
      message,
      lang
    });

    return res.data.reply;
  } catch (error) {
    console.error(error);
    return "Error";
  }
};
