const searchButton = document.querySelector(".new-item button");
const itemsList = document.querySelector(".items");
const addInput = document.querySelector(".new-item input");

searchButton.addEventListener("click", () => {

  const itemName = addInput.value.trim();

  console.log(itemName);

  addNewItem(itemName);
});

function addNewItem(itemName) {
  
    if (!itemName) {
    return;
  }

  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const itemText = document.createTextNode(itemName);
  const deleteButton = document.createElement("button");

  listItem.appendChild(checkbox);
  listItem.appendChild(itemText);
  itemsList.appendChild(listItem);

  // Clear the input field
  addInput.value = "";
}
