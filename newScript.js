// Initalisng the data
//**************************************************
let text = localStorage.getItem("parentInputIDJson");
let parentInputID = Number(JSON.parse(text));
if (parentInputID == 0){
  parentInputID = 1;
}
text = localStorage.getItem("parentListIDJson");
let parentListID = Number(JSON.parse(text));
if (parentListID == 0){
  parentListID = -1;
}
text = localStorage.getItem("Json");
let jsonID = Number(JSON.parse(text));

//localStorage.clear();

for (const [key, value] of Object.entries(localStorage)){
  if(key != "parentInputIDJson" && key != "parentListIDJson" && key != "Json"){
    p = JSON.parse(value);
    console.log(p)
    let parent = new Parent(p.value,p.inputID,p.listID, p.jsonID);
    parent.children = p.children
    console.log(value)
    parent.getContent = function(){
      return createMarkUpForParent(this.value,this.listID, this.inputID)
    }
    parent.displayAllChildren = function(){
      element = document.getElementById(this.listID);
      const newItem = document.createElement("li");
      newItem.classList.add("listItem");
      parent.children.forEach(function (item, index) {
        child = initialiseChild(element,parent,item.checkboxColor,item.quantity,item.val)
        addChild(parent, child.val, element, child, newItem)
      });
    }
    createParent(parent)
    parent.displayAllChildren()
  }
}
//****************************************************

// The objects
function Child(element, input, checkboxColor, quantity){
  this.element = element;
  this.input = input;
  this.checkboxColor = checkboxColor
  this.quantity = quantity
  this.val = ""
}

function Parent(value,inputID, listID, jsonID){
  this.value = value;
  this.inputID = inputID;
  this.listID = listID;
  this.children = [];
  this.jsonID = jsonID;
  this.childIndex = 0;
}

function constructParent(value){
  let parent = new Parent(value,parentInputID.toString(), parentListID.toString(), jsonID.toString());
  parentInputID += 1
  parentListID -= 1
  const parentListIDJson = JSON.stringify(parentListID);
  localStorage.setItem("parentListIDJson", parentListIDJson);
  const parentInputIDJson = JSON.stringify(parentInputID);
  localStorage.setItem("parentInputIDJson", parentInputIDJson);
  parent.getContent = function(){
    return createMarkUpForParent(this.value,this.listID, this.inputID)
  }
  parent.displayAllChildren = function(){
    const newItem = document.createElement("li");
    newItem.classList.add("listItem");
    element = document.getElementById(parent.listID);
    parent.children.forEach(function (item, index) {
      input = document.getElementById(parent.inputID);
      addChild(parent, input.value, element, item)
    });

  }
  return parent
}

function addParrentIfPossible(){
  const addInput = document.getElementsByClassName("newListInput")[0];
  if(!addInput.checkValidity()){
    return
  }
  jsonID += 1
  const Json = JSON.stringify(jsonID);
  localStorage.setItem("Json", Json);
  const parent = constructParent(addInput.value);
  createParent(parent)
  const myJSON = JSON.stringify(parent);
  localStorage.setItem(jsonID.toString(), myJSON);
}

function createParent(parent){
  const ul = document.getElementsByClassName("ListParentItemNonBullets")[0]
  const li = document.createElement("li");
  li.classList.add("ListParentItemNonBullets");
  ul.appendChild(li);
  li.innerHTML= parent.getContent();
  const insertBtn = document.createElement("button");
  insertBtn.classList.add("btn-primary");
  insertBtn.innerHTML = "Insert";
  insertBtn.addEventListener("click",function(){addChildIfPossible(parent)})
  element = document.getElementById(parent.listID);
  element.appendChild(insertBtn);
}


/**************** */

function addChildIfPossible(parent){
  input = document.getElementById(parent.inputID);
  if(!input.checkValidity()){
    return
  }
  parent.childIndex += 1
  input = document.getElementById(parent.inputID);
  element = document.getElementById(parent.listID);
  const newItem = document.createElement("li");
  newItem.classList.add("listItem");
  let child = constructChild(newItem, parent,element)
  addChild(parent, input.value, element, child, newItem)
}

function addChild(parent, value, element, child, newItem){
  child.addLabel(newItem,value)
  child.val = value
  child.makeCheckobox()
  child.addQuantity()
  child.addDeleteButton()
  child.addEditButton()
  element.appendChild(newItem)
  parent.children.push(child)
  const myJSON = JSON.stringify(parent);
  localStorage.setItem(parent.jsonID.toString(), myJSON);
  
}


function constructChild(element, parent){
  let value = document.getElementById(parent.inputID).value;
  let child = initialiseChild(element, parent, "#eee", "0", value)
  return child
}

function initialiseChild(element, parent, color, quantity, value){
  let child = new Child(element, parent.inputID, color, quantity);
  child.makeCheckobox = function(){
    addCheckBox(this.element, child, parent)
  }
  child.addDeleteButton = function(){
    addDeleteBtn(this.element,parent,child)
  }
  child.addLabel = function(){
    this.label = addLabel(this.element, value)
  }
  child.addQuantity =  function(){
    this.quantity = addQuantity(this.element)
  }
  child.addEditButton = function(){
    addEditBtn(this.element, this.label, this.quantity, child, parent, this.childIndex)
  }
  return child
}

function createMarkUpForParent(value,listID,inputID){
  return `
    <button type="button" class="button" onclick="makeCollapsable(this.nextElementSibling)">&#9660; ${value}</button>
    <ul class="ListChildItemNonBullets" id="${listID}">
      <input type="text" id="${inputID}" class = "newItemInput" required pattern="[a-zA-Z]*">
    </ul>
  `;
}

function addCheckBox(newItem, child, parent){
  const checkmarkCircle = document.createElement("span");
  checkmarkCircle.className = "circle";
  checkmarkCircle.style.background = "#eee"
  checkmarkCircle.addEventListener("click",function(){
    const index = parent.children.indexOf(child);
    if (index > -1) {
      tickCheckbox(checkmarkCircle, child, parent, index)
    }
  })
  const checkmarkTick = document.createElement("span");
  checkmarkTick.className = "tick";
  newItem.appendChild(checkmarkCircle);
  newItem.appendChild(checkmarkTick);
}

  function edit(label, quantity, child, parent, index){
    if (!quantity.checkValidity()) {
      return;
    }
    
    if (label.style.display != "none"){
      label.style.display = "none";
      textBox = document.createElement("input");
      textBox.type = "input";
      textBox.className = "newItemInput";
      textBox.value = label.innerHTML;
      label.parentNode.insertBefore(textBox, label);
      quantity.style.display = "inline";
      quantity.removeAttribute("readonly");
    }else {
      label.style.display = "inline";
      textBox = label.previousElementSibling;
      label.innerHTML = textBox.value
      textBox.remove();
      if (quantity.value == 0) {
        quantity.style.display = "none";
      }
      quantity.setAttribute("readonly", "true");
      child.val = label.innerHTML
      child.quantity = quantity.value
      parent.children[index] = child
      const myJSON = JSON.stringify(parent);
      localStorage.setItem(parent.jsonID.toString(), myJSON);
    }
  }

  function addEditBtn(newItem, label, quantity, child, parent, index){
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click",function(){edit(label, quantity, child, parent, index)})
    newItem.appendChild(editButton);
  }

  function reCreateChild(child, element, parent, index){
    const newItem = document.createElement("li");
    newItem.classList.add("listItem");
    const label = addLabel(newItem, child.val)
    const checkmarkCircle = document.createElement("span");
    checkmarkCircle.className = "circle";
    checkmarkCircle.addEventListener("click",function(){tickCheckbox(checkmarkCircle, child, parent, index)})
    const checkmarkTick = document.createElement("span");
    checkmarkTick.className = "tick";
    checkmarkCircle.style.background = child.checkboxColor
    newItem.appendChild(checkmarkCircle);
    newItem.appendChild(checkmarkTick);

    const quantity = addQuantity(newItem)
    quantity.value = child.quantity
    if (quantity.value != 0){
      quantity.style.display = "inline"
    }

    addDeleteBtn(newItem, parent, child)
    addEditBtn(newItem, label, quantity, child, parent, index)
    
    element.appendChild(newItem)
  }

  function addLabel(newItem, value){
    let label = document.createElement("label");
    label.innerHTML = value;
    label.setAttribute("readonly", "true");
    newItem.appendChild(label);
    return label
  }

  function addQuantity(newItem){
    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.style.display = "none"
    quantity.min = 0;
    quantity.pattern ="[0-9]*"
    newItem.appendChild(quantity);
    return quantity;
  }

  function addDeleteBtn(newItem, parent, child){
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      newItem.remove();
      
      index =  parent.children.indexOf(child)
      if (index > -1) {
        parent.children.splice(index, 1);
      }
      const myJSON = JSON.stringify(parent);
      localStorage.setItem(parent.jsonID.toString(), myJSON); 
    };
    newItem.appendChild(deleteButton);
  }
