// ===================================================================
// Academic Planner — task management system
// Demonstrates: arrays, functions, DOM manipulation, event handling,
// dynamic content updates, localStorage persistence
// ===================================================================

(function () {
  const STORAGE_KEY = "justin_planner_tasks";

  /** @type {{id:number, text:string, due:string, priority:string, completed:boolean}[]} */
  let tasks = [];
  let currentFilter = "all";

  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const dateInput = document.getElementById("task-date");
  const priorityInput = document.getElementById("task-priority");
  const list = document.getElementById("task-list");
  const statTotal = document.getElementById("stat-total");
  const statActive = document.getElementById("stat-active");
  const statCompleted = document.getElementById("stat-completed");
  const filterButtons = document.querySelectorAll(".filter-tabs button[data-filter]");
  const clearCompletedBtn = document.getElementById("clear-completed");

  if (!form) return; // not on planner page

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : defaultTasks();
    } catch (e) {
      tasks = defaultTasks();
    }
  }

  function defaultTasks() {
    return [
      { id: 1, text: "Read CSC101 lecture notes on networking basics", due: "", priority: "medium", completed: false },
      { id: 2, text: "Submit COS 106 term project draft", due: "", priority: "high", completed: false },
      { id: 3, text: "Review HTML semantic elements", due: "", priority: "low", completed: true },
    ];
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function isOverdue(dueStr) {
    if (!dueStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueStr);
    return due < today;
  }

  function formatDate(dueStr) {
    if (!dueStr) return "No due date";
    const d = new Date(dueStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function getFilteredTasks() {
    if (currentFilter === "active") return tasks.filter((t) => !t.completed);
    if (currentFilter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }

  function render() {
    const visible = getFilteredTasks();
    list.innerHTML = "";

    if (visible.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `<div class="glyph">🗒️</div><p>Nothing here yet. ${
        currentFilter === "all" ? "Add your first task above." : "Nothing in this view."
      }</p>`;
      list.appendChild(empty);
    } else {
      visible.forEach((task) => list.appendChild(buildTaskEl(task)));
    }

    statTotal.textContent = tasks.length;
    statActive.textContent = tasks.filter((t) => !t.completed).length;
    statCompleted.textContent = tasks.filter((t) => t.completed).length;
  }

  function buildTaskEl(task) {
    const el = document.createElement("div");
    el.className = "task-item" + (task.completed ? " completed" : "");
    el.dataset.id = task.id;

    const overdue = !task.completed && isOverdue(task.due);

    el.innerHTML = `
      <button class="task-check" aria-label="Toggle complete">✓</button>
      <div class="task-info">
        <div class="task-text"></div>
        <div class="task-due ${overdue ? "overdue" : ""}">${overdue ? "⚠ Overdue — " : ""}${formatDate(task.due)}</div>
      </div>
      <span class="task-priority ${task.priority}">${task.priority}</span>
      <button class="task-delete" aria-label="Delete task">🗑</button>
    `;

    // Set text content safely to avoid HTML injection from user input
    el.querySelector(".task-text").textContent = task.text;

    el.querySelector(".task-check").addEventListener("click", () => toggleTask(task.id));
    el.querySelector(".task-delete").addEventListener("click", () => deleteTask(task.id));

    return el;
  }

  function addTask(text, due, priority) {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      due: due,
      priority: priority,
      completed: false,
    };
    tasks.push(newTask); // array usage
    saveTasks();
    render();
  }

  function toggleTask(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.completed);
    saveTasks();
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTask(text, dateInput.value, priorityInput.value);
    input.value = "";
    dateInput.value = "";
    priorityInput.value = "medium";
    input.focus();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", clearCompleted);

  loadTasks();
  render();
})();
