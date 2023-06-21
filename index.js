import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c24b9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Feedback")


const inputMessageEl = document.getElementById("input-message-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("endorsements-el")
const indivEndorsementsEl = document.getElementById("individual-endorsement-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")


publishBtn.addEventListener("click", function() {
    let inputMessage = inputMessageEl.value
    let inputFrom = fromEl.value
    let inputTo = toEl.value
    
    let inputValue = {inputMessage, inputFrom, inputTo}
    
    push(endorsementsInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
       let endorsementsArray = Object.entries(snapshot.val())
    
        clearEndorsementsEl()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let individualEndorsementsArray = Object.entries(endorsementsArray[i])
            let currentItem = individualEndorsementsArray[1]
            let currentItems = currentItem[1]
            let messageFrom = currentItems["inputFrom"]
            let message = currentItems["inputMessage"]
            let messageTo = currentItems["inputTo"]
            
            appendItemToendorsmentsEl(messageFrom, message, messageTo)
        }
    } else {
        endorsementsEl.innerHTML = "No items here... yet"
    }
})

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputMessageEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function appendItemToendorsmentsEl(messageFrom, message, messageTo) {
    let newEl = document.createElement("li")
    let lineBreakEl = document.createElement("br")
    let itemMessage = `To ${messageTo}\n
    ${message}\nFrom ${messageFrom}`
        console.log(itemMessage)
    
    
    //for (let i = 0; i < itemMessage.length; i++) {
        // if (i=0){
        //     newEl.innerHTML = "To " + itemMessage[i]
        //     endorsementsEl.append(newEl)
        // } else if (i = 2) {
        //     newEl.innerHTML = "From " + itemMessage[i]
        //     endorsementsEl.append(newEl)
        // } else {
            // newEl.innerHTML = itemMessage[2]
            // endorsementsEl.append(newEl)       
        //}
    //}
    
    newEl.innerHTML = itemMessage
    
    endorsementsEl.append(newEl)
}

// function appendIndividualItems(itemMessage){
//     let newEl = document.createElement("li")
    
//     for (let i = 0; i < itemMessage.length; i++) {
//         if (i=0){
//             newEl.textContent = "To " + itemMessage[i]
//             indivEndorsementsEl.append(newEl)
//         } else if (i = 2) {
//             newEl.textContent = "From " + itemMessage[i]
//             indivEndorsementsEl.append(newEl)
//         } else {
//             newEl.textContent = itemMessage[i]
//             indivEndorsementsEl.append(newEl)       
//         }
//     }
    
// }