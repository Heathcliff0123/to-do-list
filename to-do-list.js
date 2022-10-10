let addToDoButton = document.getElementById("addToDo");
let editToDoButton = document.getElementById("editToDo");
let removeToDoButton = document.getElementById("removeToDo");
let sortToDoButton = document.getElementById("sortToDo");
let toDoContainer = document.getElementById("toDoContainer");
let nameField = document.getElementById("nameField");
let dateField = document.getElementById("dateField");
let changeField = document.getElementById("changeField");
let body = document.getElementById("to-do-list");
let changed = false;
let toDoArr = [];
let index = 0;

function deleteList() {
  var child = toDoContainer.lastElementChild;
  while (child) {
    toDoContainer.removeChild(child);
    child = toDoContainer.lastElementChild;
  }
}

function repopulateList() {
  var paragraph = document.createElement("p");
  localStorage.clear();

  for (var f = 0; f < toDoArr.length; f++) {
    var paragraph = document.createElement("p");
    paragraph.innerText =
      toDoArr[f].number + ".\t" + toDoArr[f].name + ":\t" + toDoArr[f].date;

    toDoContainer.appendChild(paragraph);
    localStorage.setItem(toDoArr[f].number, JSON.stringify(toDoArr[f]));

    if (new Date(toDoArr[f].date).getFullYear() <= new Date().getFullYear()) {
      if (new Date(toDoArr[f].date).getMonth() <= new Date().getMonth()) {
        if (new Date(toDoArr[f].date).getDate() < new Date().getDate()) {
          paragraph.style.color = "red";
        }
      }
    }
    if (toDoArr[f].line) {
      paragraph.style.textDecoration = "line-through";
    }

    paragraph.addEventListener("click", function () {
      index = paragraph.textContent.indexOf(".");
      let number = paragraph.textContent.substring(0, index);
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
}

window.onload = function () {
  for (var f = 1; f <= localStorage.length; f++) {
    toDoArr.push(JSON.parse(localStorage.getItem(f)));
  }
  repopulateList();
};

addToDoButton.addEventListener("click", function () {
  let toDoItem = {
    number: toDoArr.length + 1,
    name: nameField.value,
    date: dateField.value,
    line: false,
  };
  toDoArr.push(toDoItem);
  var paragraph = document.createElement("p");
  paragraph.innerText =
    toDoItem.number + ".\t" + toDoItem.name + ":\t" + toDoItem.date;
  toDoContainer.appendChild(paragraph);
  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  toDoContainer.appendChild(removeButton);
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
    let number = paragraph.textContent.substring(0, index);
    index = parseInt(number) - 1;
    if (toDoArr[index].line) {
      paragraph.style.textDecoration = "none";
      toDoArr[index].line = false;
    } else {
      paragraph.style.textDecoration = "line-through";
      toDoArr[index].line = true;
    }
  });
});

editToDoButton.addEventListener("click", function () {
  if (changeField.value === "") {
    alert("Please enter a number in the remove/edit field");
  } else {
    changed = false;
    index = changeField.value - 1;
    if (nameField.value !== "") {
      toDoArr[index].name = nameField.value;
      changed = true;
      nameField.value = "";
      changeField.value = "";
    } else if (dateField.value !== "") {
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
  for (var f = 0; f < toDoArr.length - 1; f++) {
    for (var j = f + 1; j < toDoArr.length; j++) {
      if (toDoArr[f].name.toLowerCase() > toDoArr[j].name.toLowerCase()) {
        let temp = toDoArr[f];
        toDoArr[f] = toDoArr[j];
        toDoArr[j] = temp;
      }
    }
  }
  resetIndex();
  deleteList();
  repopulateList();
});

function resetIndex() {
  for (var f = 0; f < toDoArr.length; f++) {
    toDoArr[f].number = f + 1;
  }
}
