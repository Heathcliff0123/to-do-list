let addToDoButton = document.getElementById('addToDo');
let editToDoButton = document.getElementById('editToDo');
let removeToDoButton = document.getElementById('removeToDo');
let toDoContainer = document.getElementById('toDoContainer');
let nameField = document.getElementById('nameField');
let dateField = document.getElementById('dateField');
let changeField = document.getElementById('changeField');
let changed = false;
let toDoArr = [];
let index = 0;


function deleteList() {
    var child = toDoContainer.lastElementChild;
    while(child){
        toDoContainer.removeChild(child);
        child = toDoContainer.lastElementChild;
    }
}

function repopulateList(){
    var paragraph = document.createElement('p')
    for (var f=0; f< toDoArr.length; f++) {
        paragraph = document.createElement('p')
        paragraph.innerText = toDoArr[f].number + ".\t" + toDoArr[f].name + "\t" + toDoArr[f].date;
        toDoContainer.appendChild(paragraph);

        if (toDoArr[f].line) {
            paragraph.style.textDecoration = "line-through";
        }
    }
    
}

addToDoButton.addEventListener('click', function(){
    let toDoItem = {'number' : toDoArr.length + 1, 'name' : nameField.value, 'date': dateField.value, 'line': false};
    toDoArr.push(toDoItem);
    var paragraph = document.createElement('p')
    paragraph.innerText = toDoItem.number + ".\t" + toDoItem.name + "\t" + toDoItem.date;
    toDoContainer.appendChild(paragraph);
    nameField.value = "";
    dateField.value = "";
   paragraph.addEventListener('click', function(){
        index = paragraph.textContent.indexOf(".");
        let number = paragraph.textContent.substring(0, index);
        index = parseInt(number) - 1;
        if(toDoArr[index].line){
            paragraph.style.textDecoration = "none";
            toDoArr[index].line = false; 
        } else{
            paragraph.style.textDecoration = "line-through";
            toDoArr[index].line = true;
        }
   })
})

editToDoButton.addEventListener('click',function(){
    if (changeField.value === ""){
        alert("Please enter a number in the remove/edit field");
    } else {
        changed = false;
        index = changeField.value -1;
        if (nameField.value !== ""){
            toDoArr[index].name = nameField.value;
            changed = true;
            nameField.value = "";
            changeField.value = "";
        } else if(dateField.value !== ""){
            toDoArr[index].date = dateField.value;
            changed = true;
            dateField.value = "";
            changeField.value = "";
        }

        if(!changed){
            alert("Please enter a value in the name or date field to edit the value");
        } else {
            changed = false;
        }
        deleteList();
        repopulateList();
    }
})
removeToDoButton.addEventListener('click',function(){
    if (changeField.value === ""){
        alert("Please enter a number in the remove/edit field");
    } else {
        index = changeField.value -1;
        toDoArr.splice(index, 1);

        for (var f=0;f<toDoArr.length;f++){
            toDoArr[f].number = f + 1;
        }
        changeField.value = "";
        deleteList();
        repopulateList();
    }
})

