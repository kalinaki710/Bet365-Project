
      function makeCollapsable(element){
          element.style.display = (element.style.display === "block" ? "none" : "block");
      }

      function tickCheckbox(element){
        element.style.background = (element.style.background === "green" ? "#eee" : "green");
      }

      function createParent(addInput){
        const ul = document.querySelector(".ListParentItemNonBullets");
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
        addButton.style.display = "block"
        const input = document.createElement("input");
        input.type = "text";
        input.className = "newItemInput";
        newList.appendChild(input);
        newList.appendChild(addButton);
        button.addEventListener("click",function(){makeCollapsable(button.nextElementSibling)})
        addButton.addEventListener("click",function(){addChild(newList,input)})
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

      function checkIfThereIsInput(addInput){
        if(addInput.value === ""){
          alert("Enter the list name please!!!");
        }
        else{
          createParent(addInput)
        }
      }

        function edit(label){
          if (label.style.display != "none"){
            label.style.display = "none";
            textBox = document.createElement("input");
            textBox.type = "input";
            textBox.className = "newItemInput";
            textBox.value = label.innerHTML;
            label.parentNode.insertBefore(textBox, label);
          }else {
            label.style.display = "inline";
            textBox = label.previousElementSibling;
            label.innerHTML = textBox.value;
            textBox.remove();
          }
        }

        function addEditBtn(newItem, label){
          const editButton = document.createElement("button");
          editButton.innerHTML = "Edit";
          editButton.addEventListener("click",function(){edit(label)})
          newItem.appendChild(editButton);
        }

        function addChild(element, input){
          if(input.value === ""){
            alert("Enter the list name please!!!");
          }else{
            const newItem = document.createElement("li");
            newItem.classList.add("listItem");
            label = addLabel(newItem, input)
            console.log(label)
            addCheckBox(newItem)
            addQuantity(newItem)
            addDeleteBtn(newItem)
            addEditBtn(newItem,label)
            element.appendChild(newItem)
          }
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
          newItem.appendChild(quantity);
        }

        function addDeleteBtn(newItem){
          const deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.onclick = function () {
            newItem.remove();
          };
          newItem.appendChild(deleteButton);
        }

      /******************************************/
      // Add a parent item
      function addParrent(){
        const addInput = document.getElementsByClassName("newListInput")[0];
        checkIfThereIsInput(addInput)
      }
