(function(){
    'use strict';

    if(Storage !== undefined){
        const pomodoroObj = {
            tasks: ["1", "2", "3"]
        };

        pomodoroObj.tasks.push("4");

        localStorage.setItem('pomodoro', JSON.stringify(pomodoroObj));
    }else{
        console.log("Browser does not support LocalStorage");
    }

    console.log(JSON.parse(localStorage.getItem('pomodoro')));

    // Add generic eventlisteners
    document.addEventListener('click', (event) => {
        if(event.target.hasAttribute("data-action")){
            // Elements used in a task element
            const elem = event.target;
            const action = event.target.dataset["action"];

            switch(action){
                case 'close':
                    elem.parentNode.remove();
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
                break;
            }
        }else{
            console.log("click but no action");
        }
    });

})();