// --- Dark Mode Toggle ---
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// --- To-Do List ---
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
const taskUL = document.getElementById('taskList');

function renderTasks() {
  taskUL.innerHTML = '';
  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">X</button>`;
    taskUL.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  if (taskInput.value.trim() !== '') {
    taskList.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    taskInput.value = '';
    renderTasks();

    // 🎉 Confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks();
}

renderTasks();

// --- Motivation Quotes ---
function showQuote() {
  let quotes = [
    "Believe in yourself 💪",
    "Small steps lead to big success 🌟",
    "Consistency is the key 🔑",
    "You can do this! 🌈",
    "Dream big and work hard 💖"
  ];
  let random = Math.floor(Math.random() * quotes.length);
  document.getElementById('quote').innerText = quotes[random];
}

// --- Exam Countdown ---
function startCountdown() {
  const examDateInput = document.getElementById('examDate').value;
  if(!examDateInput) return alert('Select a date!');
  const countDownDate = new Date(examDateInput).getTime();

  const countdownDisplay = document.getElementById('countdownDisplay');

  const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if(distance < 0) {
      clearInterval(x);
      countdownDisplay.innerText = "📌 Exam Today! Good Luck!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds = Math.floor((distance % (1000*60))/1000);

    countdownDisplay.innerText = `📅 ${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }, 1000);
}
