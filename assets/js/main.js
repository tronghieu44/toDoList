let listTask = [];

let showTasks = "";

// Show inistal list task
if (localStorage.getItem("listTask") !== null) {
    loadLocalStorage();
}

// Check status of each tasks if done
loadCheckedTasks();

function addTask () {
    let task = document.getElementById("input").value;
    if (task == '')
        alert("Please input task name before adding")
    else {
        var taskObj = {};
        if (localStorage.getItem("listTask") === null || listTask.length == 0) {
            id = 0;
        } else {
            id = parseInt(listTask[listTask.length - 1].id) + 1
        }
        taskObj['id'] = id
        taskObj['name'] = task
        taskObj['status'] = false
        listTask.push(taskObj);
        if (localStorage.getItem("listTask") === null) {
            updateLocalStorage();
        } else {
            updateLocalStorage();
        }
        document.getElementById('input').value = null
    }
    loadLocalStorage();
    loadCheckedTasks();
}

function removeTask (id) {
    if (confirm("Do to really want to delete this task?")) {
        var i = 0;
        while (i < listTask.length) {
            if (listTask[i].id === id) {
                listTask.splice(i, 1);
            } else {
                ++i;
            }
        }
        updateLocalStorage();
    }
    loadLocalStorage();
    loadCheckedTasks();
}
function checkTask (id) {
    for (var i = 0; i < listTask.length; i++) {
        if (listTask[i].id === id) {
            listTask[i].status = !listTask[i].status
            if (listTask[i].status) {
                document.getElementById(id).checked = true;
                Li = document.getElementById(id).parentElement;
                Li.classList.add("selected")
            } else {
                Li = document.getElementById(id).parentElement;
                Li.classList.remove("selected")
                document.getElementById(id).checked = false;
            }
        }
    }
    updateLocalStorage();
    loadCheckedTasks();
}

function showListTask (task) {
    const base_url = window.location.origin;
    editURL = base_url + "/edit.html" + "?id=" + task.id;
    showTasks += " <li class='task'> <input type='checkbox' id='" + task.id + "' value='" + task.id + "' onclick='checkTask(" + task.id + ")' >  <span class='task-name'>"
        + task.name + "</span> <a class='edit' href='" + editURL + "' > <i class='fas fa-edit' onclick='editTask(" + task.id + ")'></i> </a> </span> <i class='fas fa-trash-alt' onclick='removeTask(" + task.id + ")'></i> </li>";
};

function updateLocalStorage () {
    localStorage.setItem("listTask", JSON.stringify(listTask));
}
function loadLocalStorage () {
    listTask = JSON.parse(localStorage.listTask);
    listTask.forEach(showListTask);
    document.getElementById("list_tasks").innerHTML = showTasks
    showTasks = "";
}
function loadCheckedTasks () {
    for (var i = 0; i < listTask.length; i++) {
        id = listTask[i].id
        if (listTask[i].id === id) {
            if (listTask[i].status) {
                document.getElementById(id).checked = true;
                Li = document.getElementById(id).parentElement;
                Li.classList.add("selected")
            } else {
                document.getElementById(id).checked = false;
                Li = document.getElementById(id).parentElement;
                Li.classList.remove("selected")
            }
        }
    }
}

