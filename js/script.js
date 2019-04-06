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
            const elem = event.target;
            const action = event.target.dataset["action"];
            const timerElem = elem.parentElement.querySelector("[data-timer]");
            let timerVal = parseInt(timerElem.dataset.timer);

            switch(action){
                case 'close':
                    console.log(action);
                break;

                case 'edit':
                    console.log(action);
                break;

                case 'subtract':
                    if(timerVal > 0){
                        timerVal--;
                        timerElem.innerHTML = timerVal;
                        timerElem.dataset.timer = timerVal;
                    }
                break;

                case 'add':
                    timerVal++;
                    timerElem.innerHTML = timerVal;
                    timerElem.dataset.timer = timerVal;
                break;
            }
        }else{
            console.log("no action");
        }
    });

})();