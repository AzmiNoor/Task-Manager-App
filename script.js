let todoinput = document.querySelector("#todoInput");
let addtaskbutton = document.querySelector("#addtaskButton");
let tasksection = document.querySelector("#taskSection");
let todotimepicker = document.querySelector("#todotimePicker");
let todoArray = JSON.parse(localStorage.getItem('tasklist')) || [];
let deletedtask = JSON.parse(localStorage.getItem('deletedtask')) || [];
let checkboxstatus = '';
const today = new Date().toLocaleDateString('en-CA');;
let taskid = JSON.parse(localStorage.getItem('taskid')) || 1;
let overduecount = 0;
let todaycount = 0;
let allcount = 0;
let completecount = 0;
let pendingcount = 0;

addtaskbutton.addEventListener('click', () => {
    //parameter
    if ((todoinput.value).trim() === '') return;
    allcount++;
    alltask.innerHTML = allcount;
    checkboxstatus = '';
    handlepercentage(completecount, allcount);
    trackertotaltask.innerHTML = allcount;
    pendingcount++;
    pendingtask.innerHTML = pendingcount;
    let taskobject = {
        task: todoinput.value,
        date: todotimepicker.value,
        taskid: taskid,
        status: checkboxstatus,
    }
    let emptytask = document.querySelector('.emptytask');
    if (emptytask) {
        emptytask.remove();
    }

    handlesTaskdisplay(taskobject, 'all');
    // localStorage
    todoArray.push({
        task: taskobject.task,
        date: taskobject.date,
        taskid: taskid,
        status: checkboxstatus,
    })
    localStorage.setItem('tasklist', JSON.stringify(todoArray));
    taskid++;
    localStorage.setItem('taskid', taskid);
    if (todoArray[todoArray.length - 1].date === today) {
        todaycount++;
        todaytask.innerHTML = todaycount;
    }
    if (todoArray[todoArray.length - 1].date < today && todoArray[todoArray.length - 1].date !== '') {
        overduecount++;
        overduetask.innerHTML = overduecount;
    }
})


if (localStorage.getItem('tasklist') !== null) {
    let taskcontainer = JSON.parse(localStorage.getItem('tasklist'));
    taskcontainer.forEach(element => {
        handlesTaskdisplay(element, 'all');
    });
}

let addtaskSection = document.querySelector('#addtaskSection');

let completedtask = document.querySelector('.complete');
let pendingtask = document.querySelector('.pending');
let alltask = document.querySelector('.all');
let todaytask = document.querySelector('.today');
let overduetask = document.querySelector('.Overdue');
let completedtaskelement = document.querySelector('.completetask');
let pendingtaskelement = document.querySelector('.pendingtask');
let alltaskelement = document.querySelector('.alltask');
let todaytaskelement = document.querySelector('.todaystask');
let overduetaskelement = document.querySelector('.overduetask');
let typeslection = document.querySelector('.typeselection');
let searchbar = document.querySelector('#todosearchbar');

todoArray.forEach(element => {
    if (element.status === 'checked') {
        completecount++;
        completedtask.innerHTML = completecount;
    }
    if (element.status !== 'checked') {
        pendingcount++;
        pendingtask.innerHTML = pendingcount;
    }
    if (element.date === today) {
        todaycount++;
        todaytask.innerHTML = todaycount;
    }
    if (element.date < today && element.date !== '') {
        overduecount++;
        overduetask.innerHTML = overduecount;
    }
    allcount++;
    alltask.innerHTML = allcount;
})

alltaskelement.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
    addtaskSection.classList.remove('hidden')
    handleheaderstyle('All Tasks', 'flex')
    todoArray.forEach(element => {
        handlesTaskdisplay(element, 'all');
    })
});

pendingtaskelement.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
    addtaskSection.classList.remove('hidden')

    handleheaderstyle('Pending Tasks', 'flex')
    let count = 0;
    todoArray.forEach(element => {
        if (element.status !== 'checked') {
            count++;
            handlesTaskdisplay(element, 'all');
        }
    })
    if (count === 0) {
        showemptystate(`No pending tasks!
        `)
    }
})
let searchsection = document.querySelector('.searchsection')
function handleheaderstyle(heading, displayvalue) {
    searchsection.style.display = displayvalue;
    tasksection.innerHTML = '';
    typeslection.innerHTML = '';
    typeslection.innerHTML = heading;
}

overduetaskelement.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
    addtaskSection.classList.remove('hidden')

    handleheaderstyle('Overdue Tasks', 'flex')
    let count = 0;
    todoArray.forEach(element => {
        if (element.date < today && element.date !== '') {
            count++;
            handlesTaskdisplay(element, 'all');
        }
    })
    if (count === 0) {
        showemptystate(`No overdue tasks.
Great job staying on track!
        `)
    }
})

todaytaskelement.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
    addtaskSection.classList.remove('hidden')

    handleheaderstyle('Todays Tasks', 'flex')
    let count = 0;
    todoArray.forEach(element => {
        if (element.date === today) {
            count++;
            handlesTaskdisplay(element, 'all');
        }
    })
    if (count === 0) {
        showemptystate(`No tasks due today.
        `)
    }
})
completedtaskelement.addEventListener('click', () => {
    handleheaderstyle('Completed Tasks', 'flex')
    todoSidebar.classList.remove('showsidebar');
    addtaskSection.classList.remove('hidden')

    overlay.classList.remove('showOverlay');
    let count = 0
    todoArray.forEach(element => {
        if (element.status === 'checked') {
            count++;
            handlesTaskdisplay(element, 'all');
        }
    })
    if (count === 0) {
        showemptystate(`No completed tasks yet.
            `)
    }
})
let trash = document.querySelector('.trash');
let localdeletedtask = JSON.parse(localStorage.getItem('deletedtask'));
trash.addEventListener('click', () => {
    addtaskSection.classList.add('hidden');
    console.log(addtaskSection.classList)
    handleheaderstyle('Deleted Tasks', 'none');
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
    deletedtask.forEach(element => {
        handlesTaskdisplay(element, 'trash');
    })
    if (deletedtask.length === 0) {
        showemptystate(`No Deleted tasks yet!
            `)
    }
    if (deletedtask.length === 0) return;
    handlespopup(removingtask);
})

let clearcompleted = document.querySelector('.clearcompleted');
clearcompleted.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    addtaskSection.classList.add('hidden')
    overlay.classList.remove('showOverlay');
    handleheaderstyle('Completed Tasks', 'none');
    let count = 0;
    todoArray.forEach(element => {
        if (element.status === 'checked') {
            count++;
            handlesTaskdisplay(element);
        }
    })
    if (count === 0) {
        showemptystate(`No Completed tasks!
            `)
    }
    if (count === 0) return;
    handlespopup(removingcompletedtask);
})

function handlespopup(onconfirm) {
    let popupoverlay = document.createElement('div');
    popupoverlay.classList.add('popupoverlay');

    let popupbox = document.createElement('div');
    popupbox.classList.add('popupbox');

    let popuptext = document.createElement('p');
    popuptext.textContent =
        'Are you sure you want to permanently delete all tasks?';
    let popupbutton = document.createElement('div');
    popupbutton.classList.add('popupbutton');

    let confirmbtn = document.createElement('button');
    confirmbtn.textContent = 'Confirm';
    confirmbtn.classList.add('confirmbtn');

    let cancelbtn = document.createElement('button');
    cancelbtn.textContent = 'Cancel';
    cancelbtn.classList.add('cancelbtn');
    cancelbtn.addEventListener('click', () => {
        popupoverlay.remove();
    });
    confirmbtn.addEventListener('click', () => {
        onconfirm();
        removingcompletedtask();
        popupoverlay.remove();
    });
    popupbutton.append(
        confirmbtn,
        cancelbtn
    );
    popupbox.append(
        popuptext,
        popupbutton
    );
    popupoverlay.append(popupbox);
    document.body.append(popupoverlay);

}

function removingtask() {
    deletedtask = [];
    localStorage.setItem(
        'deletedtask',
        JSON.stringify(deletedtask)
    );
    tasksection.innerHTML = '';
}
function removingcompletedtask() {
    todoArray = todoArray.filter(
        task => task.status !== 'checked'
    );
    allcount = todoArray.length;
    alltask.innerHTML = allcount;
    completedcount = 0;
    completedtask.innerHTML = completedcount;
    localStorage.setItem(
        'tasklist',
        JSON.stringify(todoArray)
    );
    tasksection.innerHTML = '';
}
function handlesTaskdisplay(taskobject, mode) {
    if ((taskobject.task).trim() === '') return;
    // list
    let usertask = document.createElement('li');
    usertask.classList.add('userTask');
    // checkbox with task  
    // checkbox
    let checkboxcontainer = document.createElement('div');
    checkboxcontainer.classList.add('checkboxcontainer')
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    //   task   
    let usertaskspan = document.createElement('span');
    usertaskspan.classList.add('usertaskspan')
    usertaskspan.textContent = taskobject.task.trim();
    checkboxcontainer.append(
        checkbox,
        usertaskspan,
    )
    let buttoncontainer = document.createElement('div');
    if (mode === 'trash') {
        // butttons 
        let restorebutton = document.createElement('button');
        let deletebutton = document.createElement('button');
        buttoncontainer.classList.add('buttoncontainer')
        restorebutton.classList.add('restorebutton');
        deletebutton.classList.add('deletebutton');
        restorebutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b6574" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-restore-icon lucide-archive-restore"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h2"/><path d="M20 8v11a2 2 0 0 1-2 2h-2"/><path d="m9 15 3-3 3 3"/><path d="M12 12v9"/></svg>';
        deletebutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(91,101,116,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>';
        buttoncontainer.append(restorebutton, deletebutton);
        //   ------------------------
        deletebutton.addEventListener('click', () => {

            usertask.remove();
            deletedtask.forEach((element, value) => {
                if (taskobject.taskid === element.taskid) {
                    deletedtask.splice(value, 1);
                    localStorage.setItem('deletedtask', JSON.stringify(deletedtask));
                }
            })
            if (deletedtask.length === 0) {
                showemptystate(`No Deleted tasks yet!
            `)
            }
        })
        restorebutton.addEventListener('click', () => {
            deletedtask.forEach((element, value) => {
                if (taskobject.taskid === element.taskid) {
                    todoArray.push(element);
                    deletedtask.splice(value, 1);
                    localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    localStorage.setItem('deletedtask', JSON.stringify(deletedtask));
                    usertask.remove();
                    allcount++;
                    alltask.innerHTML = allcount;
                    if (element.status === 'checked') {
                        completecount++;
                        completedtask.innerHTML = completecount;
                    }
                    if (!(element.status === 'checked')) {
                        pendingcount++;
                        pendingtask.innerHTML = pendingcount;
                    }
                    if (element.date === today) {
                        todaycount++;
                        todaytask.innerHTML = todaycount;
                    }
                    if (element.date < today && element.date !== '') {
                        overduecount++;
                        overduetask.innerHTML = overduecount;
                    }
                }
            })
        })
    }
    else if (mode === 'all') {
        let editbutton = document.createElement('button');
        let deletebutton = document.createElement('button');
        buttoncontainer.classList.add('buttoncontainer')
        editbutton.classList.add('editbutton');
        deletebutton.classList.add('deletebutton');
        editbutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(91,101,116,1)"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>';
        deletebutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(91,101,116,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>';
        buttoncontainer.append(editbutton, deletebutton);
        //   ------------------------
        deletebutton.addEventListener('click', () => {
            allcount--;
            alltask.innerHTML = allcount;
            handlepercentage(completecount, allcount);
            trackertotaltask.innerHTML = allcount;
            if (taskobject.status === 'checked') {
                completecount--;
                completedtask.innerHTML = completecount;
                trackercompletedtask.innerHTML = completecount;

            }
            if (!(taskobject.status === 'checked')) {
                pendingcount--;
                pendingtask.innerHTML = pendingcount;
            }
            if (taskobject.date === today) {
                todaycount--;
                todaytask.innerHTML = todaycount;
            }
            if (taskobject.date < today && taskobject.date !== '') {
                overduecount--;
                overduetask.innerHTML = overduecount;
            }
            usertask.style.display = 'none';
            todoArray.forEach((element, value) => {
                if (taskobject.taskid === element.taskid) {
                    deletedtask.push(...todoArray.splice(value, 1));
                    localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    localStorage.setItem('deletedtask', JSON.stringify(deletedtask));
                    localdeletedtask = JSON.parse(localStorage.getItem('deletedtask'))
                }
            })
            if (todoArray.length === 0) {
                showemptystate(`You're all caught up! 
Add a new task to stay productive.
        `)
            }
        })
        let save = document.createElement('button');
        editbutton.addEventListener('click', () => {
            todoArray.forEach((element, value) => {
                if (taskobject.taskid === element.taskid) {
                    editbutton.style.display = 'none';
                    let editinput = document.createElement('input');
                    editinput.type = 'text';
                    editinput.value = element.task;
                    usertaskspan.textContent = '';
                    checkboxcontainer.append(
                        editinput,
                    );
                    save.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(91,101,116,1)"><path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path></svg>';
                    save.style.background = 'none';
                    save.style.border = 'none';
                    buttoncontainer.prepend(save);
                    save.style.display = 'block';
                    save.addEventListener('click', () => {
                        usertaskspan.innerHTML = editinput.value;
                        element.task = editinput.value;
                        save.style.display = 'none';
                        editinput.style.display = 'none';
                        editbutton.style.display = 'block';
                        localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    })
                }
            })
        })

    }
    else {
        let deletebutton = document.createElement('button');
        buttoncontainer.classList.add('buttoncontainer')
        deletebutton.classList.add('deletebutton');
        deletebutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(91,101,116,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>';
        buttoncontainer.append(deletebutton);
        //------------------------
        deletebutton.addEventListener('click', () => {
            usertask.remove();
            todoArray.forEach((element, value) => {
                if (taskobject.taskid === element.taskid) {
                    todoArray.splice(value, 1);
                    completecount--;
                    allcount--;
                    handlepercentage(completecount, allcount);
                    trackertotaltask.innerHTML = allcount;
                    trackercompletedtask.innerHTML = completecount;

                    localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    completedtask.innerHTML = completecount;
                    alltask.innerHTML = allcount;

                }
            })

        })

    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            todoArray.forEach((element) => {
                if (taskobject.taskid === element.taskid) {
                    checkboxstatus = 'checked';
                    element.status = checkboxstatus;
                    usertaskspan.classList.add('completed');
                    localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    state.textContent = 'Completed';
                    state.style.visibility = 'visible';
                    usertaskspan.classList.add('completed');
                    completecount++;
                    completedtask.innerHTML = completecount;
                    handlepercentage(completecount, allcount);
                    trackercompletedtask.innerHTML = completecount;
                    pendingcount--;
                    pendingtask.innerHTML = pendingcount;
                }
            })
        }
        else {
            todoArray.forEach((element) => {
                if (taskobject.taskid === element.taskid) {
                    checkboxstatus = '';
                    element.status = checkboxstatus;
                    usertaskspan.classList.remove('completed');
                    localStorage.setItem('tasklist', JSON.stringify(todoArray));
                    state.innerHTML = '&nbsp;';
                    state.style.visibility = 'hidden';
                    usertaskspan.classList.remove('completed');
                    completecount--;
                    completedtask.innerHTML = completecount;
                    handlepercentage(completecount, allcount);
                    trackercompletedtask.innerHTML = completecount;
                    pendingcount++;
                    pendingtask.innerHTML = pendingcount;
                }
            })
        }

    });

    if (taskobject.status === 'checked') {
        checkbox.checked = true;
        usertaskspan.classList.add('completed');
    }
    //date
    let displaydate = document.createElement('span');
    displaydate.classList.add('taskdate');
    if (!(taskobject.date === '')) {
        displaydate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(91,101,116,1)"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM11 13V17H6V13H11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>
        <span>${taskobject.date}</span>`;

    }
    else {
        displaydate.innerHTML = 'No Due date';
    }
    let state = document.createElement('span');
    state.classList.add('state');
    state.classList.add('checkedstate');
    if (taskobject.status === 'checked') {
        state.textContent = 'Completed';
        checkbox.checked = true;
        usertaskspan.classList.add('completed');
    } else if (!(taskobject.status === 'checked')) {
        state.innerHTML = '&nbsp;';
        state.style.visibility = 'hidden';
    }
    if (taskobject.date < today && taskobject.date !== '') {
        usertask.classList.add('overduebg');
        usertaskspan.classList.add('overdue');
        state.innerHTML = 'Overdue';
        state.style.visibility = 'visible';
        state.classList.remove('checkedstate');
        state.classList.add('overduestate');
    }
    else if (taskobject.date === today) {
        state.innerHTML = 'Today';
        state.style.visibility = 'visible';
        state.classList.remove('checkedstate');
        state.classList.remove('overduestate');
        state.classList.add('todaystate');
    }
    tasksection.prepend(usertask);
    usertask.append(
        checkboxcontainer,
        displaydate,
        state,
        buttoncontainer,
    )
    todoinput.value = '';
    todotimepicker.value = '';
}
//search 
searchbar.addEventListener('input', () => {
    let searchValue = searchbar.value.toLowerCase();
    let result = todoArray.filter(task =>
        task.task.toLowerCase().includes(searchValue)
    );
    tasksection.innerHTML = '';
    result.forEach(task => {
        handlesTaskdisplay(task);
    })
    if (tasksection.innerHTML === '') {
        showemptystate(`No matching tasks found.
Try a different keyword.
            `)
    }
})
let modebutton = document.querySelector('.modebutton');
modebutton.addEventListener('click', () => {
    modebutton.classList.toggle('modebuttontranslate')
})
//modechanger
modebutton.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
    localStorage.setItem(
        'theme',
        document.body.classList.contains('darkmode')
    );
});
if (localStorage.getItem('theme') === 'true') {
    document.body.classList.add('darkmode');
}
//progressbar
let trackercompletedtask = document.querySelector('.trackercompletedtask')
trackercompletedtask.innerHTML = completecount;
let trackertotaltask = document.querySelector('.trackertotaltask')
trackertotaltask.innerHTML = allcount;
let progresspercentage = document.querySelector('.progresspercentage')
let progressfill = document.querySelector('.progressfill')
function handlepercentage(numerator, denominator) {
    let result = denominator === 0
        ? 0
        : Math.round((numerator / denominator) * 100);
    progressfill.style.width = `${result}%`;
    progresspercentage.innerHTML = `${result}%`;
    return result;
}
let result = handlepercentage(completecount, allcount);
progressfill.style.width = `${result}%`;
progresspercentage.innerHTML = `${result}%`;


let iconbox = document.querySelector('.iconbox');
let todoSidebar = document.querySelector('.todoSidebar')
let overlay = document.querySelector('.overlay');
iconbox.addEventListener('click', () => {
    todoSidebar.classList.add('showsidebar');
    overlay.classList.add('showOverlay');
});
overlay.addEventListener('click', () => {
    todoSidebar.classList.remove('showsidebar');
    overlay.classList.remove('showOverlay');
});

function showemptystate(info) {
    let emptyinfo = document.createElement('div');
    emptyinfo.innerHTML = info;
    emptyinfo.classList.add('emptytask');
    tasksection.append(emptyinfo);
}
if (todoArray.length === 0) {
    showemptystate(`You're all caught up! 
Add a new task to stay productive.
        `)
}


