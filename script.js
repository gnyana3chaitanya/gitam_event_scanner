/* ==========================================
   GITAM Event Management System
   Version 1.0
========================================== */

const LOGIN_API = "https://chaitu1.app.n8n.cloud/webhook-test/organizer-login";

const loginButton = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginButton.addEventListener("click", login);

usernameInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        login();

    }

});

passwordInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        login();

    }

});

async function login() {

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();

    if (username === "" || password === "") {

        showMessage("Please enter username and password.", "#DC3545");

        return;

    }

    loginButton.disabled = true;

    loginButton.innerHTML = "Logging in...";

    showMessage("Authenticating...", "#0F4C81");

    try {

        const response = await fetch(LOGIN_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: username,

                password: password

            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        if (data.success === true) {

            sessionStorage.setItem(

                "organizer",

                JSON.stringify(data)

            );

            window.location.href = "dashboard.html";

        }

        else {

            showMessage(

                data.message || "Invalid username or password.",

                "#DC3545"

            );

        }

    }

    catch (error) {

        console.error(error);

        showMessage(

            "Unable to connect to server.",

            "#DC3545"

        );

    }

    finally {

        loginButton.disabled = false;

        loginButton.innerHTML = "Login";

    }

}

function showMessage(text, color) {

    message.innerHTML = text;

    message.style.color = color;

}
