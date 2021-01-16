// Define addToCart function
// Define removeFromCart function
// Define clearCart function 
// Define storeItemsInLocalStorage function 
// Define getItems function
// Define removeFromLS function 

// Define UI Elements
let form = document.querySelector("#task_form");
let taskList = document.querySelector('ul');
let filter = document.querySelector("#task_filter");
let clearBtn = document.querySelector("#clear_task_btn");
let taskInput = document.querySelector("#new_task");

// Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);


// Define Functions
function addTask(event) {
    if (taskInput.value === "") {
        alert("Please input a task!");
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute("href", "#")
        link.innerHTML = "&times";
        li.appendChild(link);
        taskList.appendChild(li);
        
        storeTaskInLocalStorage(taskInput.value);
        
        taskInput.value = "";		
    }
    event.preventDefault();	
}

function removeTask(event) {
    if(event.target.hasAttribute("href")) { //target is who hasAttribute("href")
        if(confirm("Are you sure?")) {
            let ele = event.target.parentElement;
            ele.remove();
            removeFromLS(ele);
            console.log(event.target);
        }
    }
    
}

function clearTask(event) {
    // one option
    //taskList.innerHTML = "";
    
    // faster option
    if(confirm("Are you sure?")) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
    localStorage.clear();
}

function filterTask(event) {
    let text = event.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
    console.log(text); //for testing
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute("href", "#")
        link.innerHTML = "X";
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removeFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    let li = taskItem;
    li.removeChild(li.lastChild);
    
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}