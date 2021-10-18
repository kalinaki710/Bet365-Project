      let parents = []
      let parent1 = createParent("Shopping List");
      element = document.getElementById(parent1.listID);
      apples = {element:element, input: "Apples", checkboxColor: "#eee"}
      potatoes = {element:element, input: "Potatoes", checkboxColor: "#eee"}
      parent1.children.push(apples)
      parent1.children.push(potatoes)
      parents.push(parent1)
      //parent1.displayAllChildren()
      let parent2 = createParent("Gas bill");
      metres = {element:element, input: "Read the metre", checkboxColor: "#eee"}
      parent2.children.push(metres)
      parents.push(parent2)
      //parent2.displayAllChildren()
      const myJSON = JSON.stringify(parents);
      localStorage.setItem("testJSON", myJSON);

      function makeCollapsable(element){
          element.style.display = (element.style.display === "block" ? "none" : "block");
      }

      function tickCheckbox(element, child){
        element.style.background = (element.style.background === "green" ? "#eee" : "green");
        child.checkboxColor = element.style.background
      }

      function Parent(value,inputID, listID){
        this.value = value;
        this.inputID = inputID;
        this.listID = listID;
        this.children = [];
      }

      function Child(element, input, checkboxColor, quantity){
        this.element = element;
        this.input = input;
        this.checkboxColor = checkboxColor
        this.quantity = quantity
      }

      function constructParent(value){
        let parent = new Parent(value,Math.random().toString(),Math.random().toString());
        parent.getContent = function(){
          return createMarkUpForParent(this.value,this.listID, this.inputID, this.buttonID)
        }
        parent.displayAllChildren = function(){
          element = document.getElementById(parent.listID);
          parent.children.forEach(function (item, index) {
            reCreateChild(item,element)
          });

        }
        return parent
      }

      function constructChild(element, input){
        let child = new Child(element, input, "#eee", "0");
        child.makeCheckobox = function(){
          addCheckBox(this.element, this)
        }
        child.addDeleteButton = function(){
          addDeleteBtn(this.element)
        }
        child.addLabel = function(){
          this.label = addLabel(this.element, this.input.value)
        }
        child.addQuantity =  function(){
          this.quantity = addQuantity(this.element)
        }
        child.addEditButton = function(){
          addEditBtn(this.element, this.label, this.quantity)
        }
        return child
      }

      function createMarkUpForParent(value,listID,inputID, buttonID){
        return `
          <button type="button" class="button" onclick="makeCollapsable(this.nextElementSibling)">&#9660; ${value}</button>
          <ul class="ListChildItemNonBullets" id="${listID}">
            <input type="text" id="${inputID}" class = "newItemInput"><br>
          </ul>
        `;
      }

      function createParent(value){
        const ul = document.getElementsByClassName("ListParentItemNonBullets")[0]
        const li = document.createElement("li");
        li.classList.add("ListParentItemNonBullets");
        ul.appendChild(li);

        const parent = constructParent(value);
        li.innerHTML= parent.getContent();
        const insertBtn = document.createElement("button");
        insertBtn.classList.add("btn-primary");
        insertBtn.innerHTML = "Insert";
        insertBtn.addEventListener("click",function(){addChildIfPossible(parent)})
        element = document.getElementById(parent.listID);
        element.appendChild(insertBtn);
        return parent
      }

      function addCheckBox(newItem, child){
        const checkmarkCircle = document.createElement("span");
        checkmarkCircle.className = "circle";
        checkmarkCircle.style.background = "#eee"
        checkmarkCircle.addEventListener("click",function(){tickCheckbox(checkmarkCircle, child)})
        const checkmarkTick = document.createElement("span");
        checkmarkTick.className = "tick";
        newItem.appendChild(checkmarkCircle);
        newItem.appendChild(checkmarkTick);
      }

        function edit(label, quantity){
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
            label.innerHTML = textBox.value;
            textBox.remove();
            if (quantity.value == 0) {
              quantity.style.display = "none";
            }
            quantity.setAttribute("readonly", "true");
          }
        }

        function addEditBtn(newItem, label, quantity){
          const editButton = document.createElement("button");
          editButton.innerHTML = "Edit";
          editButton.addEventListener("click",function(){edit(label, quantity)})
          newItem.appendChild(editButton);
        }

        function addChildIfPossible(parent){
          input = document.getElementById(parent.inputID);
          element = document.getElementById(parent.listID);
          if(input.value === ""){
            alert("Enter the list name please!!!");
          }else{
            addChild(parent)
          }
        }

        function addChild(parent){
          input = document.getElementById(parent.inputID);
          element = document.getElementById(parent.listID);
          const newItem = document.createElement("li");
          newItem.classList.add("listItem");
          
          let child = constructChild(newItem, input)
          child.addLabel(newItem, input.value)
          child.makeCheckobox()
          child.addQuantity()
          child.addDeleteButton()
          child.addEditButton()
          element.appendChild(newItem)
          parent.children.push(child)
        }

        function reCreateChild(child, element){
          const newItem = document.createElement("li");
          newItem.classList.add("listItem");
          const label = addLabel(newItem, child.input)
          const checkmarkCircle = document.createElement("span");
          checkmarkCircle.className = "circle";
          checkmarkCircle.addEventListener("click",function(){tickCheckbox(checkmarkCircle, child)})
          const checkmarkTick = document.createElement("span");
          checkmarkTick.className = "tick";
          newItem.appendChild(checkmarkCircle);
          checkmarkCircle.style.background = child.checkboxColor
          newItem.appendChild(checkmarkTick);

          const quantity = addQuantity(newItem)
          quantity.value = 0
          if (quantity.value != 0){
            quantity.style.display = "inline"
          }

          addDeleteBtn(newItem)
          addEditBtn(newItem, label, quantity)
          
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
          newItem.appendChild(quantity);
          return quantity;
        }

        function addDeleteBtn(newItem){
          const deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.onclick = function () {
            newItem.remove();
          };
          newItem.appendChild(deleteButton);
        }


      function addParrentIfPossible(){
        const addInput = document.getElementsByClassName("newListInput")[0];
        if(addInput.value === ""){
          alert("Enter the list name please!!!");
        }
        else{
          createParent(addInput.value)
        }
      }

      function reCreateParent(parent){
        console.log(parent)
        let par = new Parent(parent.value,parent.inputID,parent.listID);
        par.children = parent.children
        console.log(parent.listID)
        console.log(par.listID)
        par.getContent = function(){
          return createMarkUpForParent(this.value,this.listID, this.inputID, this.buttonID)
        }
        par.displayAllChildren = function(){
          element = document.getElementById(par.listID);
          par.children.forEach(function (item, index) {
            reCreateChild(item,element)
          });

        }
        par.displayAllChildren();
      }

      let text = localStorage.getItem("testJSON");
      p = JSON.parse(text);
      console.log(p[0])
      p.forEach(function (item, index){
        reCreateParent(item)
      });
      
  
