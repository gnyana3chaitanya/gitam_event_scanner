alert("script loaded");
const LOGIN_WEBHOOK = "https://chaitu1.app.n8n.cloud/webhook-test/organizer-login";
const loginButton = document.getElementById("login-btn");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");
loginButton.addEventListener("click", async () => {

    const username = usernameInput.value;

    const password = passwordInput.value;

    console.log(username);

    console.log(password);

});
const button = document.getElementById("start-btn");

const result = document.getElementById("result");

button.addEventListener("click", () => {

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(

        {
            facingMode: "environment"
        },

        {
            fps: 10,
            qrbox: 250
        },

        (decodedText) => {

            result.innerHTML =

            `
            <h2>✅ QR Detected</h2>

            <p>${decodedText}</p>
            `;

            html5QrCode.stop();

        },

        (errorMessage) => {

            // Ignore scan errors

        }

    );

});
