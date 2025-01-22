import Task from "./database.js";

async function InitializeDB() {
    await Task.insertMany([
        {
            title: "Attend Nischal’s Birthday Party",
            dueDate: "2025/01/22",
            priority: "Moderate",
            status: "Not Started",
            description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....",
            filepath: ""

        },
        {
            title: "Landing Page Design for TravelDays",
            dueDate: "2024/08/16",
            priority: "Moderate",
            status: "In Progress",
            description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room",
            filepath: ""
        },
        {
            title: "Presentation on Final Product",
            dueDate: "2024/08/15",
            priority: "Moderate",
            status: "In Progress",
            description: "Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready for...",
            filepath: ""
        },
        {
            title: "Walk the dog",
            dueDate: "2024/08/15",
            priority: "Moderate",
            status: "Completed",
            description: "Take the dog to the park and bring treats as well.",
            filepath: ""
        },
        {
            title: "Conduct meeting",
            dueDate: "2024/08/15",
            priority: "Moderate",
            status: "Completed",
            description: "Meet with the client and finalize requirements.",
            filepath: ""
        }

    ])
}

export default InitializeDB;