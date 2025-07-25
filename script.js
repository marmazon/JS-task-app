const form = document.getElementById('task-form');
const list = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const doneInput = document.getElementById('done-input');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      tasks[index].done = checkbox.checked;
      save();
      li.classList.toggle('done', checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = `${task.text} (${task.date})`;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.classList.toggle('done', task.done);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const date = dateInput.value;
  const done = doneInput.checked;
  if (!text || !date) return;

  tasks.push({ text, date, done });
  save();
  render();

  taskInput.value = '';
  dateInput.value = '';
  doneInput.checked = false;
});

render();
