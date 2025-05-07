const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

const API_KEY = "SUA_CHAVE_AQUI"; // ⚠️ Substitua pela sua chave da OpenAI

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user-message");
  userInput.value = "";

  addMessage("Digitando...", "bot-message");

  const messages = [
    { role: "system", content: "Você é um assistente educado e útil que fala português." },
    { role: "user", content: userText }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    removeLastBotMessage();
    addMessage(botReply, "bot-message");

  } catch (err) {
    removeLastBotMessage();
    addMessage("Erro ao conectar com a IA.", "bot-message");
    console.error(err);
  }
});

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastBotMessage() {
  const messages = chatBox.querySelectorAll(".bot-message");
  if (messages.length) {
    chatBox.removeChild(messages[messages.length - 1]);
  }
}
