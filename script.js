const input = document.getElementById("todo-input");
const timeInput = document.getElementById("todo-time");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const showAll = document.getElementById("show-all");
const showPending = document.getElementById("show-pending");
const showCompleted = document.getElementById("show-completed");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function updateDisplay() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const time = document.createElement("small");
    if (todo.time) {
      time.textContent = "⏰ " + new Date(todo.time).toLocaleString();
    }

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "<i class='bx bx-check'></i>";
    doneBtn.classList.add("complete");
    doneBtn.onclick = () => {
      todo.completed = !todo.completed;
      save();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='bx bx-trash'></i>";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      save();
    };

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    if (todo.time) li.appendChild(time);
    li.appendChild(actions);
    list.appendChild(li);
  });

  totalCount.textContent = todos.length;
  completedCount.textContent = todos.filter(t => t.completed).length;
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateDisplay();
}

addBtn.addEventListener("click", () => {
  const task = input.value.trim();
  const time = timeInput.value;

  if (task !== "") {
    todos.push({ text: task, time: time, completed: false });
    input.value = "";
    timeInput.value = "";
    save();
  } else {
    alert("Please enter a task!");
  }
});

showAll.onclick = () => {
  updateDisplay();
};

showPending.onclick = () => {
  list.innerHTML = "";
  todos.filter(t => !t.completed).forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${todo.text}</span>`;
    list.appendChild(li);
  });
};

showCompleted.onclick = () => {
  list.innerHTML = "";
  todos.filter(t => t.completed).forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("completed");
    li.innerHTML = `<span>${todo.text}</span>`;
    list.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", updateDisplay);