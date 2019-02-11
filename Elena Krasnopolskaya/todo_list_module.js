var ToDoListModule = (function () {
    var myModule = {};
    var list_tasks = [{description: "Hit the gym", deadline: "2019-01-25", done: false},
        {description: "Read a book", deadline: "2019-02-05", done: true},
        {description: "Organize office", deadline: "2019-02-03", done: false},
        {description: "Do homework", deadline: "2019-01-23", done: true}];

    var containerTasks;
    myModule.initContainer = function (container) {
        containerTasks = container
    };

    var addTask = function (nameTask, timeDeadline) {
        list_tasks.push({description: nameTask, deadline: timeDeadline, done: false})
    };

    myModule.addTaskInList = function (nameTask, timeDeadline) {
        addTask(nameTask, timeDeadline);
        clearContainer();
        myModule.showTasks();
    };

    var deleteTask = function (id) {
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
            listForShow = list_tasks.filter(task => task.done);
        }
        if (when != null) {
            var one_day = 1000 * 60 * 60 * 24;
            var currentTime = Date.now();
            listForShow = list_tasks.filter(task => ((Date.parse(task.deadline) - currentTime) / one_day) < diffDate);
        }

        clearContainer();
        myModule.showTasks(listForShow)
    };

    var clearContainer = function () {
        while (containerTasks.firstChild) {
            containerTasks.removeChild(containerTasks.firstChild);
        }
    };

    myModule.showTasks = function (list = list_tasks) {
        list.forEach(function (task) {
            var li = document.createElement("li");
            var inputValue = task.description;
            var t = document.createTextNode(inputValue);
            var inputValueDate = task.deadline;
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
            if (task.done)
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

    var taskComplete = function (task) {
        console.log("li");
        task.classList.toggle('checked');
        list_tasks[task.getAttribute("id_task")].done = !list_tasks[task.getAttribute("id_task")].done;
    };

    return myModule
}());