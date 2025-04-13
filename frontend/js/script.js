document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) { // ✅ Ensures loginForm exists before adding event listener
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", result.token); // ✅ Store token
                    setTimeout(() => {
                        window.location.href = "dashboard.html"; // ✅ Prevent instant redirection
                    }, 500);
                } else {
                    alert(result.error || "Invalid login credentials.");
                }
            } catch (error) {
                console.error("Login Error:", error);
            }
        });
    }

    // ✅ Prevent infinite redirect loops
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname.split("/").pop();

    if (!token && currentPath !== "login.html") {
        setTimeout(() => {
            window.location.href = "login.html"; // ✅ Delayed redirect to avoid browser throttling
        }, 500);
    } else if (token && currentPath === "index.html") {
        fetchCriminals();
    }
});

// ✅ Fetch and display criminals
async function fetchCriminals() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first!");
            window.location.href = "login.html";
            return;
        }

        const response = await fetch("http://localhost:5000/criminals", {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const criminals = await response.json();
        displayCriminals(criminals);
    } catch (error) {
        console.error("Error fetching criminals:", error);
    }
}

// ✅ Display criminals in table
function displayCriminals(criminals) {
    const criminalsTable = document.getElementById("criminalsTableBody");
    if (!criminalsTable) return; // ✅ Prevents errors if the table does not exist

    criminalsTable.innerHTML = "";

    criminals.forEach(criminal => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${criminal.id}</td>
            <td>${criminal.name}</td>
            <td>${criminal.age}</td>
            <td>${criminal.gender}</td>
            <td>${criminal.crime_type}</td>
            <td>${criminal.crime_severity}</td>
            <td>${criminal.arrest_date}</td>
            <td>${criminal.arrest_location}</td>
            <td>${criminal.officer_in_charge}</td>
            <td>${criminal.case_status}</td>
            <td>${criminal.prison_name || "N/A"}</td>
            <td>${criminal.release_date || "N/A"}</td>
            <td>${criminal.description}</td>
        `;
        criminalsTable.appendChild(row);
    });
}

// ✅ Add new criminal
const criminalForm = document.getElementById("criminal-form");
if (criminalForm) {
    criminalForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            crime_type: document.getElementById("crime_type").value,
            crime_severity: document.getElementById("crime_severity").value,
            arrest_date: document.getElementById("arrest_date").value,
            arrest_location: document.getElementById("arrest_location").value,
            officer_in_charge: document.getElementById("officer_in_charge").value,
            case_status: document.getElementById("case_status").value,
            prison_name: document.getElementById("prison_name").value || null,
            release_date: document.getElementById("release_date").value || null,
            description: document.getElementById("description").value
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in first!");
                return;
            }

            const response = await fetch("http://localhost:5000/criminals", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            fetchCriminals();
            criminalForm.reset();
            alert("Criminal record added successfully!");
        } catch (error) {
            console.error("Error adding criminal record:", error);
            alert("Failed to add criminal record. Please try again.");
        }
    });
}
