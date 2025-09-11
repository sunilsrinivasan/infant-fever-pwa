// chatbot.js - Complete Fever Chatbot with 45 Steps

const steps = {
  // Steps 1-12
  1: { text: "How long has your child been suffering from fever?", options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "1–3 days",          next: 13 },
      { label: "More than 3 days",  next: 45 }
    ] },
  2: { text: "Do you have a thermometer?", options: [
      { label: "Yes", next: 3 },
      { label: "No",  next: 6 }
    ] },
  3: { text: "Did you measure the temperature?", options: [
      { label: "Yes", next: 4   },
      { label: "No",  next: "3.1" }
    ] },
  "3.1": { text: "Please measure temperature and restart.", options: [
      { label: "Restart", next: 1 }
    ] },
  4: { text: "Is the temperature above 100°F?", options: [
      { label: "Yes", next: 7   },
      { label: "No",  next: "4.1" }
    ] },
  "4.1": { text: "Monitor hourly; restart if >100°F.", options: [
      { label: "Restart", next: 1 }
    ] },
  6: { text: "Is your child hot to touch?", options: [
      { label: "Yes", next: 7   },
      { label: "No",  next: "6.1" }
    ] },
  "6.1": { text: "Check other symptoms; restart if needed.", options: [
      { label: "Restart", next: 1 }
    ] },
  7: { text: "Is your child <3 months old?", options: [
      { label: "Yes", next: "7.1" },
      { label: "No",  next: 8     }
    ] },
  "7.1": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },
  8: { text: "Is your child active?", options: [
      { label: "Yes", next: 9   },
      { label: "No",  next: "8.1" }
    ] },
  "8.1": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },
  9: { text: "Is child taking fluids?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No",  next: 10        }
    ] },
  10: { text: "Signs of dehydration?", options: [
      { label: "Yes", next: "dehydrate" },
      { label: "No",  next: 11         }
    ] },
  "dehydrate": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },
  11: { text: "Show interest in surroundings?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No",  next: 12        }
    ] },
  12: { text: "Voided urine in past 6h?", options: [
      { label: "Yes", next: "viral_lt6m" },
      { label: "No",  next: "no_urine" }
    ] },
  "no_urine": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },
  "viral_lt6m": { text: `Likely viral. Paracetamol 40 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 13-21: <3-6 months
  13: { text: "Select age group:", options: [
      { label: "<3 months", next: 14 },
      { label: "3–6 months", next: 15 },
      { label: "6–12 months",next: 22 },
      { label: "1–3 years",   next: 26 },
      { label: "3–6 years",   next: 31 },
      { label: "6–10 years",  next: 37 },
      { label: ">10 years",   next: 41 }
    ] },
  14: { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] },
  15: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_3_6m" },
      { label: "No",  next: 16 }
    ] },
  16: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_3_6m" },
      { label: "No",  next: 17 }
    ] },
  17: { text: "Travel outside town?", options: [
      { label: "Yes", next: "viral_3_6m" },
      { label: "No",  next: 20 }
    ] },
  20: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 21     }
    ] },
  21: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_3_6m" }
    ] },
  "viral_3_6m": { text: `Likely viral. Paracetamol 40 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },
  "vaccine_3_6m": { text: `Vaccine fever. Paracetamol 40 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 22-25: 6-12 months
  22: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_6_12m" },
      { label: "No",  next: 23 }
    ] },
  23: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_6_12m" },
      { label: "No",  next: 24 }
    ] },
  24: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 25 }
    ] },
  25: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_6_12m" }
    ] },
  "viral_6_12m": { text: `Likely viral. Paracetamol 50 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },
  "vaccine_6_12m": { text: `Vaccine fever. Paracetamol 50 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 26-30: 1-3 years
  26: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_1_3y" },
      { label: "No",  next: 27 }
    ] },
  27: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_1_3y" },
      { label: "No",  next: 28 }
    ] },
  28: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_1_3y" },
      { label: "No",  next: 29 }
    ] },
  29: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 30 }
    ] },
  30: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_1_3y" }
    ] },
  "viral_1_3y": { text: `Likely viral. Paracetamol 125 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },
  "vaccine_1_3y": { text: `Vaccine fever. Paracetamol 125 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 31-36: 3-6 years
  31: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_3_6y" },
      { label: "No",  next: 32 }
    ] },
  32: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_3_6y" },
      { label: "No",  next: 33 }
    ] },
  33: { text: "Vaccination past week?", options: [
      { label: "Yes", next: "vaccine_3_6y" },
      { label: "No",  next: 34 }
    ] },
  34: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 35 }
    ] },
  35: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_3_6y" }
    ] },
  "viral_3_6y": { text: `Likely viral. Paracetamol 187.5 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },
  "vaccine_3_6y": { text: `Vaccine fever. Paracetamol 187.5 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 37-40: 6-10 years
  37: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_6_10y" },
      { label: "No",  next: 38 }
    ] },
  38: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_6_10y" },
      { label: "No",  next: 39 }
    ] },
  39: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 40 }
    ] },
  40: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_6_10y" }
    ] },
  "viral_6_10y": { text: `Likely viral. Paracetamol 250 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },
  "vaccine_6_10y": { text: `Vaccine fever. Paracetamol 250 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Steps 41-44: >10 years
  41: { text: "Any other family member fever?", options: [
      { label: "Yes", next: "viral_gt10y" },
      { label: "No",  next: 42 }
    ] },
  42: { text: "Ice cream or cold drinks past 3 days?", options: [
      { label: "Yes", next: "viral_gt10y" },
      { label: "No",  next: 43 }
    ] },
  43: { text: "Breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No",  next: 44 }
    ] },
  44: { text: "Other symptoms (pain, cough)?", options: [
      { label: "Yes", next: "refer" },
      { label: "No",  next: "viral_gt10y" }
    ] },
  "viral_gt10y": { text: `Likely viral. Paracetamol 375 mg every 6h for 2 days. Observe.`, options: [
      { label: "Restart", next: 1 }
    ] },

  // Step 45
  45: { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },

  // Common actions
  "doctor": { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
    ] },
  "refer": { text: "Consult the appropriate chat box.", options: [
      { label: "Restart", next: 1 }
    ] }
};

let chatLog = document.getElementById("chat-log");

function showStep(id) {
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

// Start chat
showStep(1);
