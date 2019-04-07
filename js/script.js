(function(){
    'use strict';

    if(Storage === undefined){
        alert("Browser does not support LocalStorage");
    }

    const pomodoros = JSON.parse(localStorage.getItem('pomodoros'));
    const taskContainer = document.querySelectorAll('.taskContainer')[0];
    const pomodoroObj = {
        description: 'container for all the pomodoro tasks',
        tasks: [],
    };

    class Task{
        constructor(){
            this.text = "default text";
            this.timer = 25;
            this.id = Math.floor(Math.random()*1000000000);
        }
    }

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
                    // BJA WIP
                    // console.log(elem.parentNode.id);
                    // let pomodoros = JSON.parse(localStorage.getItem('pomodoros'));
                    // pomodoros.tasks.forEach((item, index) => {
                    //     console.log(item.id, index, elem.parentNode.id);
                    //     if(item.id == elem.parentNode.id){
                    //         var thing = pomodoros.tasks.splice(index, 1);
                    //         console.log(thing);
                    //     }
                    // });
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
                    console.log(action);
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
                    localStorage.setItem('pomodoros', JSON.stringify(pomodoroObj));
                break;

                case 'logTasks':
                    console.log(action);
                    console.log(JSON.parse(localStorage.getItem('pomodoros')));
            }
        }else{
            console.log("click but no action");
        }
    });

})();