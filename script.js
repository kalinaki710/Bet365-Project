/******************************************/
      // Make it collapsable
      const buttons = document.getElementsByClassName("button");
      // Counter for iterating through all the elements
      var count;

      for (count = 0; count < buttons.length; count++) {
        buttons[count].addEventListener("click", function() {
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
            }
        });
      }

      /******************************************/
      // Make the checkbox green on click
      const checkmarks = document.getElementsByClassName("circle");
      for (count = 0; count < checkmarks.length; count++) {
        checkmarks[count].addEventListener("click", function(){
          if (this.style. background === "green") {
            this.style.background = "#eee";
          } else {
            this.style.background = "green";
            }
        });
      }

      /******************************************/
      // Add a parent item
      function addParrent(){
        const addInput = document.getElementsByClassName("newListInput")[0];
        if(addInput.value === ""){
          alert("Enter the list name please!!!");
        }else{
          const ul = document.querySelector(".ListParentItemNonBullets");
          const li = document.createElement("li");
          const button = document.createElement("button");
          button.type = "button";
          button.innerHTML = "&#9660; " + addInput.value;
          button.onclick = function () {
            let child = this.nextElementSibling;
            console.log(child)
            if (child.style.display === "block") {
              child.style.display = "none";
            } else {
              child.style.display = "block";
              }
          };
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
          const insert = document.createElement("input");
          insert.type = "text";
          const input = document.createElement("input");
          input.type = "text";
          input.className = "newItemInput";
          li.appendChild(input);
          addButton.onclick = function(){
            if(addInput.value === ""){
              alert("Enter the list name please!!!");
            }else{
             const newItem = document.createElement("li");
             newItem.classList.add("listItem");
             const checkmarkCircle = document.createElement("span");
             checkmarkCircle.className = "circle";
             checkmarkCircle.addEventListener("click", function(){
               if (this.style. background === "green") {
                 this.style.background = "#eee";
               } else {
                 this.style.background = "green";
                 }
             });
             const checkmarkTick = document.createElement("span");
             checkmarkTick.className = "tick";
             let label = document.createElement("label");
             label.innerHTML = input.value;
             label.setAttribute("readonly", "true");
             newItem.appendChild(label);
             newItem.appendChild(checkmarkCircle);
             newItem.appendChild(checkmarkTick);
             const quantity = document.createElement("input");
             quantity.type = "number";
             quantity.style.display = "none"
             newItem.appendChild(quantity);
             const deleteButton = document.createElement("button");
             deleteButton.innerHTML = "Delete";
             deleteButton.onclick = function () {
               newItem.remove();
             };
             newItem.appendChild(deleteButton);
             const editButton = document.createElement("button");
             editButton.innerHTML = "Edit";
             editButton.onclick = function () {
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

             };
             newItem.appendChild(editButton);
             newList.appendChild(newItem);
            }
          }
          li.appendChild(addButton);
          dltBtn = document.createElement("button");
          dltBtn.type = "button";
          dltBtn.innerHTML = "Delete";
          dltBtn.classList.add("btn-primary");
          dltBtn.style.display = "block"
          dltBtn.onclick = function(){
            li.remove();
            button.remove();
          }
          li.appendChild(dltBtn);
        }
      }
