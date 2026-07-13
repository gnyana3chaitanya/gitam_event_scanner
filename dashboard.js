// ======================================
// GITAM Event Management System
// Dashboard.js Version 1.0
// ======================================

document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {

    // Get organizer from sessionStorage

    const organizer = JSON.parse(
        sessionStorage.getItem("organizer")
    );

    if (!organizer){

        window.location.href="index.html";

        return;

    }

    // Display organizer details

    document.getElementById("organizerName").innerText =
        organizer.organizer_name;

    document.getElementById("organizerRole").innerText =
        organizer.role;

    document.getElementById("welcomeName").innerText =
        organizer.organizer_name;

    console.log("Logged in Organizer");

    console.log(organizer);

    try{

        const response = await fetch(

            DASHBOARD_API,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    organizer_id:organizer.organizer_id

                })

            }

        );

        const result = await response.json();

        console.log("Dashboard API Response");

        console.log(result);

    }

    catch(error){

        console.error(error);

    }

}

// Logout

document.getElementById("logoutBtn").addEventListener(

    "click",

    ()=>{

        sessionStorage.clear();

        window.location.href="index.html";

    }

);
