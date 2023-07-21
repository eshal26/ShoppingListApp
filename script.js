
let input = document.getElementById("in")
let btn = document.getElementById("add-button")
const appSettings = {
    dataBaseUrl: "https://myfirstproject-f606d-default-rtdb.firebaseio.com/",
    projectId: "myfirstproject-f606d"
}
const list = document.getElementById("shopping-list")

const app = firebase.initializeApp(appSettings)
const database = firebase.database()
const shoppingListInDB = database.ref( "shopping list")

console.log(app)

btn.addEventListener("click", function(){
    let inputValue = input.value
    shoppingListInDB.push(inputValue)
    
    input.value = ""
})

shoppingListInDB.on("value", (snapshot) => {

    if(snapshot.exists()){
    let data = Object.entries(snapshot.val());
    let dataVal = Object.values(snapshot.val())
    list.innerHTML = ""
    for(let i = 0; i<data.length; i++){
        let currentItem = data[i]
        let currentItemID = data[0]

        let currentItemValue = dataVal[i]
        appendItem(currentItem)
    }
}else{
    list.innerHTML = "No items here yet."
}
});

function appendItem(val){
   
    let itemID = val[0]
    let itemValue = val[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let locationOfItem = database.ref(`shopping list/${itemID}`)
        /
        locationOfItem.remove((error) => {
            if (error) {
                console.error("Error removing item from the database:", error);
            } else {
                console.log(`Item with ID ${itemID} removed from database`);
            }
    })
})
       list.append(newEl)
}
