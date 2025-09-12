// chatbot.js - Infant Fever Chatbot
const steps = {
  1: { text: "How long has your child been suffering from fever?", options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "1–3 days", next: 13 },
      { label: "More than 3 days", next: 45 }
    ]
  },
  2: { text: "Do you have a thermometer?", options: [
      { label: "Yes", next: 3 },
      { label: "No", next: 6 }
    ]
  },
  // ... include all steps 3–44 from your original file here ...
  45: { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  }
};

function showStep(id) {
  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML = "";
  const step = steps[id];
  chatLog.innerHTML += `<div class="bot">${step.text.replace(/\n/g, "<br>")}</div>`;
  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => showStep(opt.next);
    chatLog.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chat-container");
  const logDiv = document.createElement("div");
  logDiv.id = "chat-log";
  container.appendChild(logDiv);
  showStep(1);
});
