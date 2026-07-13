document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {

    const organizer = JSON.parse(sessionStorage.getItem("organizer"));

    if (!organizer) {
        window.location.href = "index.html";
        return;
    }

    try {

        const response = await fetch(DASHBOARD_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                organizer_id: organizer.organizer_id
            })
        });

        const result = await response.json();

        console.log(result);

    } catch (err) {

        console.error(err);

    }

}
