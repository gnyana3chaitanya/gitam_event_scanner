// ===========================================
// GITAM Event Management System
// dashboard.js
// Version 1.0
// ===========================================

document.addEventListener("DOMContentLoaded", initializeDashboard);

let organizer = null;
let dashboardData = null;
let selectedEvent = null;

// ===========================================
// INITIALIZE DASHBOARD
// ===========================================

async function initializeDashboard() {

    organizer = JSON.parse(sessionStorage.getItem("organizer"));

    if (!organizer) {

        window.location.href = "index.html";

        return;

    }

    loadOrganizerDetails();

    registerButtonEvents();

    await loadDashboard();

}

// ===========================================
// LOAD ORGANIZER DETAILS
// ===========================================

function loadOrganizerDetails() {

    document.getElementById("organizerName").innerText =
        organizer.organizer_name;

    document.getElementById("organizerRole").innerText =
        organizer.role;

    document.getElementById("welcomeName").innerText =
        organizer.organizer_name;

}

// ===========================================
// DASHBOARD API
// ===========================================

async function loadDashboard() {

    try {

        const response = await fetch(

            DASHBOARD_API,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    organizer_id: organizer.organizer_id

                })

            }

        );

        if (!response.ok) {

            throw new Error("Dashboard API Error");

        }

        dashboardData = await response.json();

        console.log(dashboardData);

        if (!dashboardData.success) {

            alert("Unable to load dashboard.");

            return;

        }

        populateEventDropdown(dashboardData.events);

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to Dashboard API.");

    }

}

// ===========================================
// POPULATE EVENT DROPDOWN
// ===========================================

function populateEventDropdown(events) {

    const dropdown = document.getElementById("eventDropdown");

    dropdown.innerHTML = "";

    if (events.length === 0) {

        dropdown.innerHTML =
            "<option>No Events Assigned</option>";

        return;

    }

    events.forEach((event, index) => {

        const option = document.createElement("option");

        option.value = index;

        option.textContent = event.event_name;

        dropdown.appendChild(option);

    });

    dropdown.addEventListener("change", function () {

        selectedEvent = events[this.value];

        displayEvent(selectedEvent);

    });

    selectedEvent = events[0];

    displayEvent(selectedEvent);

}

// ===========================================
// DISPLAY EVENT
// ===========================================

function displayEvent(event) {

    document.getElementById("eventName").innerText =
        event.event_name;

    document.getElementById("eventDate").innerText =
        event.event_date;

    document.getElementById("eventVenue").innerText =
        event.venue;

    document.getElementById("eventFee").innerText =
        event.registration_fee;

    // Temporary Statistics

    document.getElementById("registeredCount").innerText = "0";

    document.getElementById("checkedInCount").innerText = "0";

    document.getElementById("checkedOutCount").innerText = "0";

    document.getElementById("certificateCount").innerText = "0";
}

// ===========================================
// REGISTER BUTTON EVENTS
// ===========================================

function registerButtonEvents() {

    document
        .getElementById("scannerBtn")
        .addEventListener("click", openScanner);

    document
        .getElementById("registrationsBtn")
        .addEventListener("click", openRegistrations);

    document
        .getElementById("reportsBtn")
        .addEventListener("click", openReports);

    document
        .getElementById("certificateBtn")
        .addEventListener("click", openCertificates);

    document
        .getElementById("logoutBtn")
        .addEventListener("click", logout);

}

// ===========================================
// SCANNER
// ===========================================

function openScanner() {

    if (!selectedEvent) {

        alert("Please select an event.");

        return;

    }

    alert(
        "Scanner Module\n\nSelected Event:\n" +
        selectedEvent.event_name
    );

}

// ===========================================
// REGISTRATIONS
// ===========================================

function openRegistrations() {

    if (!selectedEvent) {

        alert("Please select an event.");

        return;

    }

    alert(
        "Registrations Module\n\nSelected Event:\n" +
        selectedEvent.event_name
    );

}

// ===========================================
// REPORTS
// ===========================================

function openReports() {

    if (!selectedEvent) {

        alert("Please select an event.");

        return;

    }

    alert(
        "Reports Module\n\nSelected Event:\n" +
        selectedEvent.event_name
    );

}

// ===========================================
// CERTIFICATES
// ===========================================

function openCertificates() {

    if (!selectedEvent) {

        alert("Please select an event.");

        return;

    }

    alert(
        "Certificates Module\n\nSelected Event:\n" +
        selectedEvent.event_name
    );

}

// ===========================================
// LOGOUT
// ===========================================

function logout() {

    const confirmLogout = confirm(
        "Do you really want to logout?"
    );

    if (!confirmLogout) {

        return;

    }

    sessionStorage.clear();

    window.location.href = "index.html";

}
