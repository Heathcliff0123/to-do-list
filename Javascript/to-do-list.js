const editToDoButton = document.getElementById("editToDo");
const addToDoButton = document.getElementById("addToDo");
const removeToDoButton = document.getElementById("removeToDo");
const sortToDoButton = document.getElementById("sortToDo");
const toDoContainer = document.getElementById("toDoContainer");
const nameField = document.getElementById("nameField");
const dateField = document.getElementById("dateField");
const changeField = document.getElementById("changeField");
const body = document.getElementById("to-do-list");
let changed = false;
let toDoArr = [];
let index = 0;

function populateContainer(toDoItem) {
  //This function populates the container that shows the todolist items
  var paragraph = document.createElement("p");
  paragraph.innerText =
    toDoItem.number + ".\t" + toDoItem.name + ":\t" + toDoItem.date;
  toDoContainer.appendChild(paragraph);
  nameField.value = "";
  dateField.value = "";
  localStorage.setItem(toDoItem.number, JSON.stringify(toDoItem));
  const holda = toDoItem.date.split("-");
  if (holda[0] <= new Date().getFullYear()) {
    if (holda[1] <= new Date().getMonth() + 1) {
      if (holda[2] < new Date().getDate()) {
        console.log("help me");
        paragraph.style.color = "red";
      }
    }
  }
  paragraph.addEventListener("click", function () {
    index = paragraph.textContent.indexOf(".");
    const number = paragraph.textContent.substring(0, index);
    index = parseInt(number) - 1;
    if (toDoArr[index].line) {
      paragraph.style.textDecoration = "none";
      toDoArr[index].line = false;
    } else {
      paragraph.style.textDecoration = "line-through";
      toDoArr[index].line = true;
    }
  });
}
function deleteList() {
  //this function clears the container displaying the to do list items
  let child = toDoContainer.lastElementChild;
  while (child) {
    toDoContainer.removeChild(child);
    child = toDoContainer.lastElementChild;
  }
}

function repopulateList() {
  /*This function repopulates all the data 
  throughout the program if a change was made to the data*/
  localStorage.clear();

  for (var f = 0; f < toDoArr.length; f++) {
    populateContainer(toDoArr[f]);
  }
}

window.onload = function () {
  //This function gets all the data from local storage on start up
  for (var f = 1; f <= localStorage.length; f++) {
    toDoArr.push(JSON.parse(localStorage.getItem(f)));
  }
  repopulateList();
};

addToDoButton.addEventListener("click", function () {
  //This function adds an element to the data and the container with the todolist
  const toDoItem = {
    number: toDoArr.length + 1,
    name: nameField.value,
    date: dateField.value,
    line: false,
  };
  if (nameField.value.trim() != "") {
    toDoArr.push(toDoItem);
    populateContainer(toDoItem);
  } else {
    alert("Please enter a valid value in the name field");
  }
});

editToDoButton.addEventListener("click", function () {
  //This function edits an element in the to do list
  if (changeField.value === "") {
    alert("Please enter a number in the remove/edit field");
  } else {
    changed = false;
    index = changeField.value - 1;
    if (nameField.value.trim() !== "") {
      toDoArr[index].name = nameField.value;
      changed = true;
      nameField.value = "";
      changeField.value = "";
    } else if (dateField.value.trim() !== "") {
      toDoArr[index].date = dateField.value;
      changed = true;
      dateField.value = "";
      changeField.value = "";
    }

    if (!changed) {
      alert("Please enter a value in the name or date field to edit the value");
    } else {
      changed = false;
    }
    deleteList();
    repopulateList();
  }
});

removeToDoButton.addEventListener("click", function () {
  // This function removes an element from the to do list
  if (changeField.value === "") {
    alert("Please enter a number in the remove/edit field");
  } else {
    index = changeField.value - 1;
    toDoArr.splice(index, 1);

    resetIndex();
    changeField.value = "";
    deleteList();
    repopulateList();
  }
});

sortToDoButton.addEventListener("click", function () {
  //This function sorts the to do list
  for (var f = 0; f < toDoArr.length - 1; f++) {
    for (var j = f + 1; j < toDoArr.length; j++) {
      if (toDoArr[f].name.toLowerCase() > toDoArr[j].name.toLowerCase()) {
        let temp = toDoArr[f];
        toDoArr[f] = toDoArr[j];
        toDoArr[j] = temp;
      }
    }
  }
  /*
  couldn't get it to work
  toDoArr.sort(function (a, b) {
    return b.name.toLowerCase() - a.name.toLowerCase();
  });
  */
  resetIndex();
  deleteList();
  repopulateList();
});

function resetIndex() {
  /*This function ensures that the index/Identefying 
  key of all the element are up to date and in the correct order*/
  for (var f = 0; f < toDoArr.length; f++) {
    toDoArr[f].number = f + 1;
  }
}
