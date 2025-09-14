
// chatbot.js - Infant Fever Chatbot (Complete Updated)

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
      { label: "Yes", next: 13 },
      { label: "No", next: "4.1" }
    ]
  },
  "4.1": { text: "Monitor hourly; restart if >100°F.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  6: { text: "Is your child hot to touch?", options: [
      { label: "Yes", next: 13 },
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
      { label: "Yes", next: 13 },
      { label: "No", next: "8.1" }
    ]
  },
  "8.1": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  9: { text: "Is child taking fluids?", options: [
      { label: "Yes", next: 15 },
      { label: "No", next: 10 }
    ]
  },
  10: { text: "Signs of dehydration like dry tongue?", options: [
      { label: "Yes", next: "dehydrate" },
      { label: "No", next: 11 }
    ]
  },
  "dehydrate": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ]
  },
  11: { text: "Show interest in surroundings?", options: [
      { label: "Yes", next: 13 },
      { label: "No", next: 12 }
    ]
  },
  12: {
    text: "Voided urine in past 6h?",
    options: [
      { label: "Yes", next: 15 },
      { label: "No", next: "no_urine" }
    ]
  },
  "no_urine": {
    text: "Consult doctor immediately.",
    options: [{ label: "Restart", next: 1 }]
  },

  // 3–6 months dosing
  "viral_lt6m": {
    text: "Likely viral. 3–6 months: P 100 drops (100 mg/ml) – 8 drops (40 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },

  // 6–12 months dosing
  "viral_6_12m": {
    text: "Likely viral. 6–12 months: P 100 drops (100 mg/ml) – 10 drops (50 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },


  // Age 3–6 months
  13: { text: "Select age group:", options: [
      { label: "<3 months", next: 14 },
      { label: "3–6 months", next: 20 },
      { label: "6–12 months", next: 24 },
      { label: "1–3 years", next: 29 },
      { label: "3–6 years", next: 34 },
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
      { label: "No", next: "viral_3_6m" }
    ]
  },
  20: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 21 }
    ]
  },
  21: { text: "Other symptoms (incessant cry, cough, vomit, loose stools, fits, rash)?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 9 }
    ]
  },
  "viral_3_6m": {
    text: "Likely viral. 3–6 months: P 100 drops (paracetamol 100 mg/ml) – 8 drops (40 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_3_6m": {
    text: "Vaccine-related fever. 3–6 months: P 100 drops (paracetamol 100 mg/ml) – 8 drops (40 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },

  // Age 6–12 months
  22: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_6_12m" },
      { label: "No", next: 23 }
    ]
  },
  23: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_6_12m" },
      { label: "No", next: "viral_6_12m" }
    ]
  },
  24: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 25 }
    ]
  },
  25: { text: "Other symptoms (incessant cry,very tired, vomit, loose stools, fits, rash, dry tongue, reduced urine)?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 22 }
    ]
  },
  "viral_6_12m": {
    text: "Likely viral. 6–12 months: P 100 drops (paracetamol 100 mg/ml) – 10 drops (50 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_6_12m": {
    text: "Vaccine-related fever. 6–12 months: P 100 drops (paracetamol 100 mg/ml) – 10 drops (50 mg) every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },

  // Age 1–3 years
  26: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_1_3y" },
      { label: "No", next: 27 }
    ]
  },
  27: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_1_3y" },
      { label: "No", next: 28 }
    ]
  },
  28: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_1_3y" },
      { label: "No", next: "viral_1_3y" }
    ]
  },
  29: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 30 }
    ]
  },
  30: { text: "incessant cry,very tired, vomit, loose stools, fits, rash, dry tongue, reduced urine?", options: [
      { label: "Yes", next: "refer" },
      { label: "No", next: 26 }
    ]
  },
  "viral_1_3y": {
    text: "Likely viral. 1–3 years: P 125 syrup (125 mg/5 ml) – 5 ml every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_1_3y": { text: "Vaccine-related fever. 1–3 years: P 125 syrup (125 mg/5 ml) – 5 ml every 6 hours if fever.", options: [{ label: "Restart", next: 1 }] },

  // Age 3–6 years
  31: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_3_6y" },
      { label: "No", next: 32 }
    ]
  },
  32: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_3_6y" },
      { label: "No", next: 33 }
    ]
  },
  33: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_3_6y" },
      { label: "No", next: "viral_3_6y" }
    ]
  },
  34: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 35 }
    ]
  },
  35: { text: "Other symptoms (very tired, vomit, loose stools, fits, rash, dry tongue, reduced urine?)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No", next: 31 }
    ]
  },
  "viral_3_6y": {
    text: "Likely viral. 3–6 years: P 125 syrup (125 mg/5 ml) – 7.5 ml every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_3_6y": { text: "Vaccine-related fever. 3–6 years: P 125 syrup (125 mg/5 ml) – 7.5 ml every 6 hours if fever.", options: [{ label: "Restart", next: 1 }] },

  // Age 6–10 years
  37: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_6_10y" },
      { label: "No", next: 38 }
    ]
  },
  38: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_6_10y" },
      { label: "No", next: 39 }
    ]
  },
  39: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 40 }
    ]
  },
  40: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No", next: "viral_6_10y" }
    ]
  },
  "viral_6_10y": {
    text: "Likely viral. 6–10 years: P 250 syrup (250 mg/5 ml) – 5 ml every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  "vaccine_6_10y": { text: "Vaccine-related fever. 6–10 years: P 250 syrup (250 mg/5 ml) – 5 ml every 6 hours if fever.", options: [{ label: "Restart", next: 1 }] },

  // Age >10 years
  41: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_gt10y" },
      { label: "No", next: 42 }
    ]
  },
  42: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_gt10y" },
      { label: "No", next: 43 }
    ]
  },
  43: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 44 }
    ]
  },
  44: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No", next: "viral_gt10y" }
    ]
  },
  "viral_gt10y": {
    text: "Likely viral. Above 10 years: P 250 syrup (250 mg/5 ml) – 7.5 ml every 6 hours if fever.",
    options: [{ label: "Restart", next: 1 }]
  },
  45: { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  "doctor": { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  "refer": { text: "Consult the appropriate chat box.", options: [{ label: "Restart", next: 1 }] }
};

function showStep(id) {
  const chatLog = document.getElementById("chat-log");
  chatLog.innerHTML = "";
  const step = steps[id];
  const msg = document.createElement("div");
  msg.className = "bot mb-4";
  msg.innerHTML = step.text.replace(/\n/g, "<br>");
  chatLog.appendChild(msg);
  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => showStep(opt.next);
    btn.className = "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg m-2";
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
