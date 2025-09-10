const steps = {
  1: {
    text: "How long has your child been suffering from fever?",
    options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "1 day – 3 days",        next: 13 },
      { label: "More than 3 days",      next: 45 }
    ]
  },
  2: {
    text: "Do you have a thermometer?",
    options: [
      { label: "Yes", next: 3 },
      { label: "No",  next: 6 }
    ]
  },
  3: {
    text: "Did you measure the temperature?",
    options: [
      { label: "Yes", next: 4    },
      { label: "No",  next: "3.1"}
    ]
  },
  "3.1": {
    text: "Please measure the axillary temperature and return to the chat.",
    options: []
  },
  4: {
    text: "Is the axillary temperature above 100 °F?",
    options: [
      { label: "Yes", next: 7    },
      { label: "No",  next: "4.1"}
    ]
  },
  "4.1": {
    text: "Monitor the temperature every hour. If it goes above 100 °F, you can use this chat box again.",
    options: []
  },
  6: {
    text: "Is your child hot to touch?",
    options: [
      { label: "Yes", next: 7    },
      { label: "No",  next: "6.1"}
    ]
  },
  "6.1": {
    text: "If your child has any other problem, please check the appropriate chat.",
    options: []
  },
  7: {
    text: "Is your child less than 3 months old?",
    options: [
      { label: "Yes", next: "7.1" },
      { label: "No",  next: 8     }
    ]
  },
  "7.1": {
    text: "Please consult your doctor.",
    options: []
  },
  8: {
    text: "Is your child active?",
    options: [
      { label: "Yes", next: 9    },
      { label: "No",  next: "8.1"}
    ]
  },
  "8.1": {
    text: "Contact your doctor.",
    options: []
  },
  9: {
    text: "Is your child taking water or fluids?",
    options: [
      { label: "Yes", next: "9.1"},
      { label: "No",  next: 10   }
    ]
  },
  "9.1": {
    text: `Your child's fever is likely viral. Continue paracetamol:

6 mo–1 yr: 10 drops (50 mg) every 6 h

1–3 yr: 5 ml of P125 every 6 h

3–6 yr: 7.5 ml of P125 every 6 h

6–10 yr: 5 ml of P250 every 6 h

>10 yr: 7.5 ml of P250 every 6 h`,
    options: []
  },
  10: {
    text: "Does your child show dehydration signs (dry tongue, reduced urine)?",
    options: [
      { label: "Yes", next: "10.1"},
      { label: "No",  next: 11   }
    ]
  },
  "10.1": {
    text: "Please consult your doctor.",
    options: []
  },
  11: {
    text: "Does your child show interest in surroundings?",
    options: [
      { label: "Yes", next: "11.1"},
      { label: "No",  next: 12   }
    ]
  },
  "11.1": {
    text: "Give fluids/foods as above.",
    options: []
  },
  12: {
    text: "Has your child voided urine in the past 6 hours?",
    options: [
      { label: "Yes", next: "12.1"},
      { label: "No",  next: "12.2"}
    ]
  },
  "12.1": {
    text: "Give fluids/foods and observe. Continue paracetamol as above. Consult doctor if worsens.",
    options: []
  },
  "12.2": {
    text: "Contact your doctor.",
    options: []
  },
  13: {
    text: "Select your child's age group:",
    options: [
      { label: "Less than 3 months", next: 14 },
      { label: "3–6 months",         next: 15 },
      { label: "6–12 months",        next: 22 },
      { label: "1–3 years",          next: 26 },
      { label: "3–6 years",          next: 31 },
      { label: "6–10 years",         next: 37 },
      { label: "Above 10 years",     next: 41 }
    ]
  },
  14: { text: "Please consult your doctor.", options: [] },
  15: {
    text: "Is any other family member having fever?",
    options: [
      { label: "Yes", next: "viral15" },
      { label: "No",  next: 16       }
    ]
  },
  "viral15": {
    text: `Your child's fever is likely viral. Paracetamol 40 mg (8 drops) every 6 h for 2 days. Observe and consult if worsens.`,
    options: []
  },
  16: {
    text: "Did your child receive a vaccination within the past week?",
    options: [
      { label: "Yes", next: "vaccine16" },
      { label: "No",  next: 17         }
    ]
  },
  "vaccine16": {
    text: `Likely vaccine fever. Paracetamol 40 mg every 6 h for 2 days. Observe and consult if worsens.`,
    options: []
  },
  17: {
    text: "Did you travel outside your town in past week?",
    options: [
      { label: "Yes", next: "viral17" },
      { label: "No",  next: 20       }
    ]
  },
  "viral17": {
    text: `Likely viral. Paracetamol 40 mg every 6 h for 2 days. Observe.`,
    options: []
  },
  20: {
    text: "Does your child have breathing difficulty?",
    options: [
      { label: "Yes", next: "doctor20" },
      { label: "No",  next: 21        }
    ]
  },
  "doctor20": { text: "Consult your doctor immediately.", options: [] },
  21: {
    text: "Does your child have other symptoms (abdomen pain, cough, etc.)?",
    options: [
      { label: "Yes", next: "refer21" },
      { label: "No",  next: "viral21"}
    ]
  },
  "refer21": { text: "Consult the appropriate chat box.", options: [] },
  "viral21": {
    text: `Likely viral. Paracetamol 40 mg every 6 h for 2 days. Observe.`,
    options: []
  },
  // ... steps 22–44 omitted for brevity ...
  45: { text: "Consult your doctor.", options: [] }
};

let currentStep = 1;
const chatLog = document.getElementById("chat-log");

function showStep(step) {
  const node = steps[step];
  chatLog.innerHTML += `<div class="bot">${node.text}</div>`;
  // Remove old option buttons
  document.querySelectorAll(".option-btn").forEach(b => b.remove());
  // Render new options
  if (node.options && node.options.length) {
    node.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = opt.label;
      btn.onclick = () => showStep(opt.next);
      chatLog.appendChild(btn);
    });
  }
}

showStep(currentStep);
