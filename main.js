let underLine = document.getElementById("under-line");
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div"); 
let mode = "all";
let filterList = [];

console.log(tabs)
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        addTask(event);
    }
})

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

function addTask(){
    // console.log("clicked");
    let taskValue = taskInput.value;
    if(taskValue==="") return alert("할일을 입력해주세요");
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render();
}

function render() {
    // 선택한 탭에 따라서 리스트 달리 보여준다
    // all > taskList
    // ongoing, done > filterList
    let resultHTML = "";
    let list = [] 
    if (mode === "all"){
        list = taskList;
    } else if(mode==="ongoing" || mode==="done"){
        list = filterList;
    } 

    for (let i=0; i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTML+=`<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        } else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    // console.log("clicked!!")
    console.log("id:", id);
    for (let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete; //현재 반대값 
            break;
        }
    }
    filter();
    // render();
    // console.log(taskList);
}
function deleteTask(id) {
    console.log("삭제");
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1); // i번째 요소 1개를 배열에서 제거
            break; 
        }
    }
    filter();
    // console.log(taskList);
    // render(); 
}


function filter(e){
    
    if(e){
        mode = event.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    }
    filterList = [];
    // 3가지 경우
    if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == false) {
            filterList.push(taskList[i]);
        }
        }
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete) {
            filterList.push(taskList[i]);
        }
        }
    }
    render();
    
}



function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}