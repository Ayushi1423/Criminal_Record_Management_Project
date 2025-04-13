document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }
    
    fetchCriminals();
});

// ✅ Fetch and display criminals
async function fetchCriminals() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

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
    if (!criminalsTable) return;

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
