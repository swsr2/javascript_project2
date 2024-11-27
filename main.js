// 유저가 값을 입력한다
// +버튼을 클릭하면, 할일추가
// delete버튼 클릭하면, 할일이 삭제된다
// check버튼 누르면 할일이 끝나면서 밑줄
// 1. check 누르는 순간 true > false
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 진행중인걸로 간주하고 그대로
// 4. check 다시 누르면 안끝난걸로 변경
// 진행중 끝남 탭 누르면 언더바 이동
// 끝남은 끝난 아이템만, 진행중은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let underLine = document.getElementById("under-line");
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div"); //조건에 만족하는 모든것을 가져옴
let mode = "all"; // 전역변수 선언
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