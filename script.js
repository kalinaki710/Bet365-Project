function makeCollapsable(element){
          element.style.display = (element.style.display === "block" ? "none" : "block");
      }

      function tickCheckbox(element){
        element.style.background = (element.style.background === "green" ? "#eee" : "green");
      }

      function  createmarkUpForParent(value) {
        return `
          <button type="button" class="button" onclick="makeCollapsable(this.nextElementSibling)">&#9660; ${value}</button>
          <ul class="ListChildItemNonBullets" id="${value}list">
            <input type="text" id="${value}input" class = "newItemInput"><br>
            <button type="button" class="btn-primary" onclick=addChildIfPossible(document.getElementById('${value}list'),document.getElementById('${value}input'))>Insert</button>
          </ul>
        `;
      } 

      function createParent(addInput){
        /*const ul = document.getElementsByClassName("ListParentItemNonBullets")[0]
        const li = document.createElement("li");
        li.classList.add("ListParentItemNonBullets");
        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "&#9660; " + addInput.value;
        const newList = document.createElement("ul");
        newList.classList.add("ListChildItemNonBullets");
        li.appendChild(newList);
        button.classList.add("button");
        ul.appendChild(button);
        ul.appendChild(li);
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.innerHTML = "Insert";
        addButton.classList.add("btn-primary");
        const input = document.createElement("input");
        input.type = "text";
        input.className = "newItemInput";
        newList.appendChild(input);
        newList.appendChild(addButton);
        button.addEventListener("click",function(){makeCollapsable(button.nextElementSibling)})
        addButton.addEventListener("click",function(){addChildIfPossible(newList,input)})
        */
       
        const ul = document.getElementsByClassName("ListParentItemNonBullets")[0]
        const li = document.createElement("li");
        li.classList.add("ListParentItemNonBullets");
        ul.appendChild(li);
        
        li.innerHTML= createmarkUpForParent(addInput.value);
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
          let label = addLabel(newItem, input)
          addCheckBox(newItem)
          let quantity = addQuantity(newItem)
          addDeleteBtn(newItem)
          addEditBtn(newItem,label, quantity)
          console.log(element)
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
