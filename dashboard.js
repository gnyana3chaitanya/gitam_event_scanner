/* ==========================================
   GITAM Event Management System
   Version 1.0
========================================== */

// Check Login Session

const organizer = JSON.parse(sessionStorage.getItem("organizer"));

if (!organizer) {

    window.location.href = "index.html";

}

// Load Organizer Details

document.getElementById("organizerName").innerText =
    organizer.organizer_name;

document.getElementById("organizerRole").innerText =
    organizer.role;

document.getElementById("welcomeName").innerText =
    organizer.organizer_name;

// Logout

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmLogout = confirm("Do you want to logout?");

    if (!confirmLogout) return;

    sessionStorage.clear();

    window.location.href = "index.html";

});

// ----------------------------
// Temporary Button Actions
// (These will be connected later)
// ----------------------------

document.getElementById("scannerBtn").addEventListener("click", () => {

    alert("Scanner Module - Coming in Sprint 3");

});

document.getElementById("registrationsBtn").addEventListener("click", () => {

    alert("Registrations Module - Coming in Sprint 4");

});

document.getElementById("reportsBtn").addEventListener("click", () => {

    alert("Reports Module - Coming in Sprint 5");

});

document.getElementById("certificateBtn").addEventListener("click", () => {

    alert("Certificates Module - Coming in Sprint 6");

});
