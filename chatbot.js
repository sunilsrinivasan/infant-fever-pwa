const steps = {
  1: { text: "How long has your child been suffering from fever?", options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "1 day – 3 days", next: 13 },
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
      { label: "No", next: 3.1 }
    ]
  },
  '3.1': { text: "Please measure the axillary temperature and return to the chat.", options: [] },
  4: { text: "Is the axillary temperature above 100 °F?", options: [
      { label: "Yes", next: 7 },
      { label: "No", next: 4.1 }
    ]
  },
  '4.1': { text: "Monitor the temperature every hour. If it goes above 100 °F, you can use this chat box again.", options: [] },
  6: { text: "Is your child hot to touch?", options: [
      { label: "Yes", next: 7 },
      { label: "No", next: 6.1 }
    ]
  },
  '6.1': { text: "If your child has any other problem, please check the appropriate chat.", options: [] },
  7: { text: "Is your child less than 3 months old?", options: [
      { label: "Yes", next: 7.1 },
      { label: "No", next: 8 }
    ]
  },
  '7.1': { text: "Please consult your doctor.", options: [] },
  8: { text: "Is your child active?", options: [
      { label: "Yes", next: 9 },
      { label: "No", next: 8.1 }
    ]
  },
  '8.1': { text: "Contact your doctor.", options: [] },
  9: { text: "Is your child taking water or fluids?", options: [
      { label: "Yes", next: 9.1 },
      { label: "No", next: 10 }
    ]
  },
  '9.1': { text: `Your child's fever is likely viral. Continue paracetamol:

6mo–1yr: 10 drops (50mg) every 6h
1–3yr: 5ml of P125 every 6h
3–6yr: 7.5ml of P125 every 6h
6–10yr: 5ml of P250 every 6h
>10yr: 7.5ml of P250 every 6h`, options: [] },
  10: { text: "Does your child show dehydration signs (dry tongue, reduced urine)?", options: [
      { label: "Yes", next: 10.1 },
      { label: "No", next: 11 }
    ]
  },
  '10.1': { text: "Please consult your doctor.", options: [] },
  11: { text: "Does your child show interest in surroundings?", options: [
      { label: "Yes", next: 11.1 },
      { label: "No", next: 12 }
    ]
  },
  '11.1': { text: "Give fluids/foods as above.", options: [] },
  12: { text: "Has your child voided urine in the past 6 hours?", options: [
      { label: "Yes", next: 12.1 },
      { label: "No", next: 12.2 }
    ]
  },
  '12.1': { text: "Give fluids/foods and observe. Continue paracetamol as above. Consult doctor if worsens.", options: [] },
  '12.2': { text: "Contact your doctor.", options: [] },
  13: { text: "Your child is: <select id=\"age-select\">\n<option value=14>Less than 3 months</option>\n<option value=15>3–6 months</option>\n<option value=22>6–12 months</option>\n<option value=26>1–3 years</option>\n<option value=31>3–6 years</option>\n<option value=37>6–10 years</option>\n<option value=41>Above 10 years</option>\n</select>", options: [] },
  // ... include steps 14–45 here ...
  45: { text: "Consult your doctor.", options: [] }
};

let currentStep = 1;
const chatLog = document.getElementById('chat-log');

function showStep(step) {
  const node = steps[step];
  chatLog.innerHTML += `<div class='bot'>${node.text}</div>`;
  if (node.options.length) {
    node.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.innerText = opt.label;
      btn.onclick = () => selectOption(opt.next);
      chatLog.appendChild(btn);
    });
  }
}

function selectOption(next) {
  currentStep = next;
  showStep(currentStep);
}

// Initialize chat
showStep(currentStep);
