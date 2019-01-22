var ToDoListModule = (function () {
    var myModule = {};
    var list_tasks = [["Hit the gym", "2019-01-25", false], ["Read a book", "2019-02-05", true], ["Organize office", "2019-02-03", false], ["Do homework", "2019-01-23", true]];

    var containerTasks;
    myModule.initContainer = function (container) {
        containerTasks = container
    };

    addTask = function (nameTask, timeDeadline) {
        list_tasks.push([nameTask, timeDeadline, false])
    };

    myModule.addTaskInList = function (nameTask, timeDeadline) {
        addTask(nameTask, timeDeadline);
        clearContainer();
        myModule.showTasks();
    };

    deleteTask = function (id) {
        if (id > -1) {
            list_tasks.splice(id, 1);
        }
    };

    myModule.applyFilters = function (isComplete = null, when = null) {
        var isCompleteBool;
        var diffDate = null;
        console.log(isComplete);
        switch (isComplete) {
            case 'null':
                isCompleteBool = null;
                break;
            case 'true':
                isCompleteBool = true;
                break;
            case 'false':
                isCompleteBool = false;
                break
        }
        console.log(isCompleteBool);
        if (when != null) {
            diffDate = parseInt(when)
        }
        var listForShow;
        if (isCompleteBool != null) {
            listForShow = list_tasks.filter(task => task[2] == isCompleteBool);
        }
        if (when != null) {
            var one_day = 1000 * 60 * 60 * 24;
            var currentTime = Date.now();
            listForShow = list_tasks.filter(task => ((Date.parse(task[1]) - currentTime) / one_day) < diffDate);
        }

        clearContainer();
        myModule.showTasks(list = listForShow)
    };

    var clearContainer = function () {
        while (containerTasks.firstChild) {
            containerTasks.removeChild(containerTasks.firstChild);
        }
    };

    myModule.showTasks = function (list = list_tasks) {
        list.forEach(function (task) {
            // for (var task in list) {
            var li = document.createElement("li");
            var inputValue = task[0];
            var t = document.createTextNode(inputValue);
            var date = document.createElement("time");
            var inputValueDate = task[1];
            li.appendChild(t);
            li.appendChild(document.createTextNode(" Deadline: " + inputValueDate));
            if (inputValue === '') {
                alert("You must write something!");
            } else {
                containerTasks.appendChild(li);
            }

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            li.setAttribute("id_task", list.indexOf(task));
            span.appendChild(txt);
            li.appendChild(span);
            if (task[2])
                li.classList.toggle('checked');
            span.onclick = function () {
                this.parentNode.onclick = function () {
                };
                deleteTask(this.parentNode.getAttribute("id_task"));
                clearContainer();
                myModule.showTasks()
            };
            li.onclick = function () {
                taskComplete(this)
            }
        });
    };

    taskComplete = function (task) {
        console.log("li");
        task.classList.toggle('checked');
        list_tasks[task.getAttribute("id_task")][2] = !list_tasks[task.getAttribute("id_task")][2];
    };

    return myModule
}());