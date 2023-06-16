import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: `${__FIREBASE_DB__}`
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListRef = "shoppingList";
const shoppingListInDB = ref(database, shoppingListRef);

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

let allItems = {};

const clearInputFieldEl = () => {
    inputFieldEl.value = "";
}

const appendItemToShoppingListEl = (id, value) => {
    // shoppingListEl.innerHTML += `<li>${value}</li>`
    const newEl = document.createElement("li")
    newEl.textContent = value
    // newEl.id = id
    newEl.addEventListener("click", () => {
        let elementRefInDB = ref(database, `${shoppingListRef}/${id}`);
        remove(elementRefInDB);
    });
    shoppingListEl.append(newEl)
}

const getCurrentItems = () => {

};

addButtonEl.addEventListener("click", (event) => {
    let inputValue = inputFieldEl.value;
    inputValue = inputValue.trim();
    if (inputValue === "") {
        return;
    }
    const itemsArray = Object.values(allItems);
    const inputValueLC = inputValue.toLowerCase();
    for (let i=0; i<itemsArray.length; i++) {
        let currentItem = itemsArray[i].toLowerCase();
        if (inputValueLC == currentItem) {
            clearInputFieldEl();
            return;
        }
    }
    
    // console.log(inputValue);
    clearInputFieldEl();
    
    push(shoppingListInDB, inputValue);

    // appendItemToShoppingListEl(inputValue);
    
});


const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = "";
}

onValue(shoppingListInDB, (snapshot) => {
    let shoppingList = {}
    if (snapshot.exists()) {
        shoppingList = snapshot.val();
        allItems = shoppingList;
        const itemsArray = Object.entries(shoppingList);
        clearShoppingListEl();
        itemsArray.forEach(([ id, item ]) => {
            appendItemToShoppingListEl(id, item);
        })
    }
    else {
        allItems = {}
        shoppingListEl.innerHTML = "No items here... yet";
    }
});
