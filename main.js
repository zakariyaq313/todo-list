(function() {
    'use strict';
    let date = new Date(),
        dayString = date.toLocaleDateString("default", {
        weekday: "long"
    });

    let day = date.getDate(),
        month = date.toLocaleDateString("default", {
        month: "long"
    });

    document.querySelector("h1.day").textContent = dayString;
    document.querySelector("h2.month").textContent = day + " " + month;
}());

let userInput = document.querySelector("input.add-item"),
    taskList = document.querySelector("ul.items-list"),
    card = document.querySelector("div.card"),
    info = document.querySelector("p.empty-info"),
    idleBackground = document.querySelector("img.idle");

function addNewTask() {

    // Check if the first and only task being entered is an empty string
    if (userInput.value.trim() == "" && taskList.hasChildNodes() == false) {

        idleBackground.src = "images/angry.jpg";
        const emptyStringResponse = () => {
            card.style.backgroundColor = "#dbdabe";
            card.style.color = "#686d76";
            info.textContent = "Enter a proper task 😕";
        }
        idleBackground.onload = emptyStringResponse;

    // Otherwise, create a new task if a proper string is provided
    } else if (userInput.value.trim() != "") {

        idleBackground.src = "images/relaxed.jpg";
        const properTaskAdded = () => {
            card.style.backgroundColor = "#f9f9f9";
            card.style.color = "rgba(0, 0, 0, .8)";
            info.textContent = "No items in list, add some new";
        }
        idleBackground.onload = properTaskAdded;

        // Default card view is not needed because a list will appear now, so hide this
        document.querySelector("div.empty-list").style.display = "none"

        let newElement = document.createElement("li");
        taskList.appendChild(newElement);
        newElement.classList.add("list-items");

        let icon = document.createElement("i"),
            paragraph = document.createElement("p"),
            deleteIcon = document.createElement("i");

        newElement.appendChild(icon);
        newElement.appendChild(paragraph);
        newElement.appendChild(deleteIcon);

        icon.classList.add("material-icons", "task-status");
        icon.textContent = "panorama_fish_eye";

        paragraph.textContent = userInput.value;

        deleteIcon.classList.add("material-icons", "delete");
        deleteIcon.textContent = "delete";

        // Once the task is created, the input should become empty again
        userInput.value = "";

        // Now when the task gets completed, we can make it visually be seen with relevant styles
        newElement.addEventListener("click", () => {

            paragraph.classList.toggle("task-complete");

            if (paragraph.classList.contains("task-complete")) {
                icon.textContent = "check_circle";
            } else {
                icon.textContent = "panorama_fish_eye";
            }
        });

        // Event to be triggered for delete button
        deleteIcon.addEventListener("click", () => {
            newElement.remove();

            // And if there are no tasks in list, we're back to the default card view
            if (taskList.hasChildNodes() == false) {
                document.querySelector("div.empty-list").style.display = "block";
            }
        });
    }
}

document.querySelector("i.add-item-icon").addEventListener("click", () => {
    addNewTask();
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }
});
