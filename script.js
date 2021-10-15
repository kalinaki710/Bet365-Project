      function makeCollapsable(element){
          element.style.display = (element.style.display === "block" ? "none" : "block");
      }

      function tickCheckbox(element){
        element.style.background = (element.style.background === "green" ? "#eee" : "green");
      }

      function Parent(value,inputID, listID){
        this.value = value;
        this.inputID = inputID;
        this.listID = listID;
      }

      function Child(element, input){
        this.element = element;
        this.input = input;
      }

      function constructParent(value){
        let parent = new Parent(value,Math.random().toString(),Math.random().toString());
        parent.getContent = function(){
          return createMarkUpForParent(this.value,this.inputID, this.listID)
        }
        return parent
      }

      function constructChild(element, input){
        let child = new Child(element, input);
        child.makeCheckobox = function(){
          addCheckBox(this.element)
        }
        child.addDeleteButton = function(){
          addDeleteBtn(this.element)
        }
        child.addLabel = function(){
          this.label = addLabel(this.element, this.input)
        }
        child.addQuantity =  function(){
          this.quantity = addQuantity(this.element)
        }
        child.addEditButton = function(){
          addEditBtn(this.element, this.label, this.quantity)
        }
        return child
      }

      function createMarkUpForParent(value,listID,inputID){
        return `
          <button type="button" class="button" onclick="makeCollapsable(this.nextElementSibling)">&#9660; ${value}</button>
          <ul class="ListChildItemNonBullets" id="${listID}">
            <input type="text" id="${inputID}" class = "newItemInput"><br>
            <button type="button" class="btn-primary" onclick=addChildIfPossible(document.getElementById('${listID}'),document.getElementById('${inputID}'))>Insert</button>
          </ul>
        `;
      }

      function createParent(addInput){
        const ul = document.getElementsByClassName("ListParentItemNonBullets")[0]
        const li = document.createElement("li");
        li.classList.add("ListParentItemNonBullets");
        ul.appendChild(li);

        parent = constructParent(addInput.value)
        li.innerHTML= parent.getContent();
      }

      function addCheckBox(newItem){
        const checkmarkCircle = document.createElement("span");
        checkmarkCircle.className = "circle";
        checkmarkCircle.addEventListener("click",function(){tickCheckbox(checkmarkCircle)})
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

        function addChildIfPossible(element, input){
          if(input.value === ""){
            alert("Enter the list name please!!!");
          }else{
            addChild(element, input)
          }
        }

        function addChild(element, input){
          const newItem = document.createElement("li");
          newItem.classList.add("listItem");
          let child = constructChild(newItem, input)
          child.addLabel()
          child.makeCheckobox()
          child.addQuantity()
          child.addDeleteButton()
          child.addEditButton()
          element.appendChild(newItem)
        }

        function addLabel(newItem, input){
          let label = document.createElement("label");
          label.innerHTML = input.value;
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
          createParent(addInput)
        }
      }
