let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let todoList = document.getElementById("todoList");
let doneList = document.getElementById("doneList");
let todoTitle = document.getElementById("todoTitle");
let doneTitle = document.getElementById("doneTitle");

let todoTasks = ["test 1", "test 2", "test 3"];
let doneTasks = [];

addTaskBtn.onclick = function () {
  let task = taskInput.value;
  if (task !== "") {
    todoTasks.push(task);
    taskInput.value = "";
    showTasks();
  }
};

function showTasks() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todoTasks.forEach(function (task, index) {
    let div = document.createElement("div");
    div.className = "task-box";
    div.innerHTML = `<span class="task-text">${task}</span>
      <span class="actions">
        <i data-feather="check" onclick="markDone(${index})"></i>
        <i data-feather="trash" onclick="deleteTask(${index}, 'todo')"></i>
      </span>`;
    todoList.appendChild(div);
  });
  // new Sortable(todoList, {
  //   animation: 150,
  //   ghostClass: "ghost", // Optional: class for the placeholder element
  //   onEnd: (evt) => {
  //     console.log(`Item moved from index ${evt.oldIndex} to ${evt.newIndex}`);
  //   },
  // });
  doneTasks.forEach(function (task, index) {
    let div = document.createElement("div");
    div.className = "task-box";
    div.innerHTML = `<span class="task-text done-text">${task}</span>
      <span class="actions">
        <i data-feather="trash" onclick="deleteTask(${index}, 'done')"></i>
      </span>`;
    doneList.appendChild(div);
  });
  // new Sortable(doneList, {
  //   animation: 150,
  //   ghostClass: "ghost", // Optional: class for the placeholder element
  //   onEnd: (evt) => {
  //     console.log(`Item moved from index ${evt.oldIndex} to ${evt.newIndex}`);
  //   },
  // });
  const groupOptions = {
    group: "shared", // Shared group name
    animation: 150,
    ghostClass: "ghost",
    onAdd: (evt) => {
      if (evt.to.id === "todoList") {
        evt.item.classList.remove("done-text");
      }
      else{
        evt.item.classList.add("done-text");

      }
    },
    onEnd: (evt) => {
      console.log(
        `Moved item from index ${evt.oldIndex} in list ${evt.from.id} to index ${evt.newIndex} in list ${evt.to.id}`
      );
    },
  };
  new Sortable(doneList, groupOptions);
  new Sortable(todoList, groupOptions);

  const todoLength = document.querySelector("#todoTitle");
  todoLength.textContent = ` Tasks to do - ${todoTasks.length}`;

  const doneLength = document.querySelector("#doneTitle");
  doneLength.textContent = `Done - ${doneTasks.length}`;

  feather.replace();
}

function markDone(index) {
  let doneTask = todoTasks.splice(index, 1)[0];
  doneTasks.push(doneTask);
  showTasks();
}

function deleteTask(index, list) {
  if (list === "todo") {
    todoTasks.splice(index, 1);
  } else if (list === "done") {
    doneTasks.splice(index, 1);
  }
  showTasks();
}

showTasks();
