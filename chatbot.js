
// chatbot.js - Infant Fever Chatbot (Enhanced)

// Step definitions including detailed dosing and spacing
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
  3: { text: "Did you measure the temperature?", options: [
      { label: "Yes", next: 4 },
      { label: "No", next: "3.1" }
    ]
  },
  "3.1": { text: "Please measure temperature and restart.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  4: { text: "Is the temperature above 100°F?", options: [
      { label: "Yes", next: 7 },
      { label: "No", next: "4.1" }
    ]
  },
  "4.1": { text: "Monitor hourly; restart if >100°F.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  6: { text: "Is your child hot to touch?", options: [
      { label: "Yes", next: 7 },
      { label: "No", next: "6.1" }
    ]
  },
  "6.1": { text: "Check other symptoms; restart if needed.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  7: { text: "Is your child <3 months old?", options: [
      { label: "Yes", next: "7.1" },
      { label: "No", next: 8 }
    ]
  },
  "7.1": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  8: { text: "Is your child active?", options: [
      { label: "Yes", next: 9 },
      { label: "No", next: "8.1" }
    ]
  },
  "8.1": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  9: { text: "Is child taking fluids?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No", next: 10 }
    ]
  },
  10: { text: "Signs of dehydration?", options: [
      { label: "Yes", next: "dehydrate" },
      { label: "No", next: 11 }
    ]
  },
  "dehydrate": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  11: { text: "Show interest in surroundings?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No", next: 12 }
    ]
  },
  12: { text: "Voided urine in past 6h?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No", next: "no_urine" }
    ]
  },
  "no_urine": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },

  // Detailed dosing for <6 months
  "viral_lt6m": {
    text: "Likely viral. Give *Crocin Pediatric* suspension (125 mg/5 ml): 40 mg (1.6 ml) every 6 hours for up to 2 days. Observe.",
    options: [{ label: "Restart", next: 1 }]
  },

  // Age 3–6 months onward...
  13: { text: "Select age group:", options: [
      { label: "<3 months", next: 14 },
      { label: "3–6 months", next: 15 },
      { label: "6–12 months", next: 22 },
      { label: "1–3 years", next: 26 },
      { label: "3–6 years", next: 31 },
      { label: "6–10 years", next: 37 },
      { label: ">10 years", next: 41 }
    ]
  },
  14: { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  15: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_3_6m" },
      { label: "No", next: 16 }
    ]
  },
  16: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_3_6m" },
      { label: "No", next: 17 }
    ]
  },
  17: { text: "Travel outside town?", options: [
      { label: "Yes", next: "viral_3_6m" },
      { label: "No", next: 20 }
    ]
  },
  20: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 21 }
    ]
  },
  21: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No", next: "viral_3_6m" }
    ]
  },
  "viral_3_6m": {
    text: "Likely viral. Give *Crocin Pediatric* suspension (125 mg/5 ml): 40 mg (1.6 ml) every 6 hours for up to 2 days. Observe.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_3_6m": {
    text: "Vaccine-related fever. Give *Crocin Pediatric* suspension (125 mg/5 ml): 40 mg (1.6 ml) every 6 hours for up to 2 days. Observe.",
    options: [{ label: "Restart", next: 1 }]
  },

  // ... similarly update other brackets ...

  45: { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  "doctor": { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  "refer": { text: "Consult the appropriate chat box.", options: [{ label: "Restart", next: 1 }] }
};

// Render function with spacing and Tailwind styling
function showStep(id) {
  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML = "";
  const step = steps[id];
  // Bot message
  const msg = document.createElement("div");
  msg.className = "bot mb-4";
  msg.innerHTML = step.text.replace(/\n/g, "<br>");
  chatLog.appendChild(msg);
  // Option buttons
  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => showStep(opt.next);
    btn.className = "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg m-2";
    chatLog.appendChild(btn);
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chat-container");
  const logDiv = document.createElement("div");
  logDiv.id = "chat-log";
  container.appendChild(logDiv);
  showStep(1);
});
