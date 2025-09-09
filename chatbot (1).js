const flow = [
  { id: 1, text: 'Does your child have fever for less than 24 hours?', yes: 2, no: 13 },
  { id: 2, text: 'Do you have a thermometer?', yes: 3, no: 13 },
  { id: 3, text: 'Did you measure the temperature?', yes: 5, no: 4 },
  { id: 4, text: 'Please measure the axillary temperature.', yes: 5 },
  { id: 5, text: 'Is the axillary temperature above 100°F?', yes: 7, no: 'Monitor hourly and revisit if >100°F.' },
  { id: 7, text: 'Is your child less than 3 months old?', yes: 'Please consult your doctor.', no: 8 },
  { id: 8, text: 'Is your child active?', yes: 9, no: 'Contact your doctor.' },
  { id: 9, text: 'Is your child taking water or fluids?', yes: 'Viral fever likely. Continue paracetamol as per age dosing guidelines.', no: 10 },
  { id: 10, text: 'Does your child show dehydration signs (dry mouth, reduced urine)?', yes: 'Please consult your doctor.', no: 11 },
  { id: 11, text: 'Does your child show interest in surroundings?', yes: 'Provide fluids/food as appropriate for age.', no: 12 },
  { id: 12, text: 'Has your child voided urine in the past 6 hours?', yes: 'Continue supportive care and paracetamol dosing.', no: 'Contact your doctor.' },
  { id: 13, text: 'Has fever lasted 1 to 3 days?', yes: 14, no: 16 },
  { id: 14, text: 'Is your child less than 3 months old?', yes: 'Please consult your doctor.', no: 15 },
  { id: 15, text: 'Any other family member with fever?', yes: 'Viral likely. Paracetamol as per age.', no: 17 },
  { id: 16, text: 'Fever >3 days: Consult your doctor.' },
  { id: 17, text: 'Vaccination in past week?', yes: 'Vaccine-related fever. Paracetamol and observe.', no: 18 },
  { id: 18, text: 'Recent travel outside town?', yes: 'Likely viral. Supportive care.', no: 19 },
  { id: 19, text: 'Any breathing difficulty?', yes: 'Consult your doctor immediately.', no: 20 },
  { id: 20, text: 'Any other concerning symptoms? (pain, vomiting, rash)', yes: 'Consult the relevant specialist.', no: 'Likely viral. Supportive care.' }
];
let current = flow[0];
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = 'chat-message ' + sender;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}
function processInput(input) {
  const ans = input.trim().toLowerCase();
  let next = (ans === 'yes' || ans === 'y') ? current.yes :
             (ans === 'no' || ans === 'n') ? current.no : null;
  if (next == null) return appendMessage('bot', 'Please answer Yes or No.');
  current = flow.find(n => n.id === next) || { text: next };
  appendMessage('bot', current.text);
}
sendBtn.addEventListener('click', () => {
  const text = userInput.value;
  if (!text) return;
  appendMessage('user', text);
  processInput(text);
  userInput.value = '';
});
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendBtn.click();
});
appendMessage('bot', current.text);