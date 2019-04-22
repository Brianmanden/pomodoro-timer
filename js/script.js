(function(){
    'use strict';

    if(Storage === undefined){
        alert("Browser does not support LocalStorage");
    }

    class Task{
        constructor(){
            this.text = "default text";
            this.timer = 25;
            this.id = Math.floor(Math.random()*1000000000);
        }
    }

    const taskContainer = document.querySelectorAll('.taskContainer')[0];

    function localStoredPomodorosExists(){
        return localStorage.getItem('pomodoros') !== null;
    }

    function getPomodoroObj(){
        return localStoredPomodorosExists() ? JSON.parse(localStorage.getItem('pomodoros')) : null;
    }

    function setPomodoroObj(pomodoroObj){
        localStorage.setItem('pomodoros', JSON.stringify(pomodoroObj));
    }

    function init(){
        let returnObj = {
            description: 'container for all the pomodoro tasks',
            tasks: [],
        };
            
        if(localStoredPomodorosExists()){
            returnObj = getPomodoroObj();
        }

        setPomodoroObj(returnObj);
        return returnObj;
    }

    let pomodoroObj = init();

    // Add generic eventlisteners
    document.addEventListener('click', (event) => {
        if(event.target.hasAttribute("data-action")){
            const elem = event.target;
            const action = event.target.dataset["action"];

            switch(action){
                case 'removeTask':
                    if(!elem.parentNode.classList.contains('taskExample')){
                        elem.parentNode.remove();
                    }

                    pomodoroObj.tasks.forEach((item, index) => {
                        if(item.id == elem.parentNode.id){
                            var task = pomodoroObj.tasks.splice(index, 1);
                            setPomodoroObj(pomodoroObj);
                        }
                    });
                break;

                case 'edit':
                    const taskTextElem = elem.parentElement.querySelector("[data-taskText]");
                    taskTextElem.contentEditable = true;
                    taskTextElem.focus();
                break;

                case 'subtractMin':
                    let subtractValue = parseInt(elem.parentElement.querySelector("[data-timer]").dataset.timer);
                    if(subtractValue > 0){
                        subtractValue--;
                        elem.parentElement.querySelector("[data-timer]").innerHTML = subtractValue;
                        elem.parentElement.querySelector("[data-timer]").dataset.timer = subtractValue;
                    }
                break;

                case 'addMin':
                    let addValue = parseInt(elem.parentElement.querySelector("[data-timer]").dataset.timer);
                    addValue++;
                    elem.parentElement.querySelector("[data-timer]").innerHTML = addValue;
                    elem.parentElement.querySelector("[data-timer]").dataset.timer = addValue;
                break;

                case 'addTask':
                    const task = new Task();
                    let taskExample = document.querySelectorAll(".taskExample")[0];
                    const taskClone = taskExample.cloneNode(true);
                    const taskId = Math.floor(Math.random()*10000000);

                    // clone HTML task element and append it to the task container
                    taskClone.id = taskId;
                    taskClone.classList = "btn-group d-flex task";
                    taskContainer.appendChild(taskClone);
                    
                    // set values for task and write it to local storage
                    task.id = taskId;
                    task.timer = taskClone.querySelector("[data-timer]").dataset.timer;
                    task.text = taskClone.querySelector("[data-taskText]").innerHTML;

                    pomodoroObj.tasks.push(task);
                    setPomodoroObj(pomodoroObj);
                break;

                case 'logTasks':
                    if(localStoredPomodorosExists() && getPomodoroObj().tasks.length > 0){
                        console.table(getPomodoroObj().tasks);
                    }else{
                        console.log("no pomodoro tasks in local storage");
                    }
                break;

                case 'clearTasks':
                    if(localStoredPomodorosExists()){
                        pomodoroObj = getPomodoroObj();
                        pomodoroObj.tasks = [];
                        setPomodoroObj(pomodoroObj);
                    }
                break;
            }
        }else{
            console.log("click but no action");
        }
    });

})();