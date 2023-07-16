const toDoSelector = document.getElementById("sundayToDo");
const modalInputToDo = document.getElementById("modalInputToDo");
const toDoMessageText = document.getElementById("toDoMessageText");

const toDoDayList = ["mondayToDo", "tuesdayToDo", "wednesdayToDo", "thursdayToDo", "fridayToDo", "saturdayToDo", "sundayToDo"]


function getAndSaveToDo()
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://192.168.2.14:8080/calendar/todo", false ); // false for synchronous request
    xmlHttp.send( null );
    // return xmlHttp.responseText;
    const toDoItems = JSON.parse(xmlHttp.responseText);
    toDoItems.forEach(item => {
        document.getElementById(item.sourceId).innerHTML = item.toDoText;
    });
}


toDoDayList.forEach((toDoDayId) => {
    const toDoDayDiv = document.getElementById(toDoDayId);
    let i = 1;
    toDoDayDiv.querySelectorAll(":scope > a").forEach((a) => {

        a.setAttribute("id", `${toDoDayId}-${i}`);
    
        i++;
    
        a.addEventListener("click", () => {
            modalInputToDo.value = a.getAttribute("id");
        });
    
    });
}) 

getAndSaveToDo();


// toDoSelector.querySelectorAll(":scope > a").forEach((a) => {

//     a.setAttribute("id", "sunday-toDo-" + i);

//     i++;

//     a.addEventListener("click", () => {
//         modalInputToDo.value = a.getAttribute("id");
//     });

// });

function saveToDo() {

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.2.14:8080/calendar/todo");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        getAndSaveToDo();
    }};

    let data = `{
    "sourceId": "${modalInputToDo.value}",
    "toDoText": "${toDoMessageText.value}"
    }`;

    xhr.send(data);

    toDoMessageText.value = "";

    
};




