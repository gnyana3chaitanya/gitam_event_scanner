const LOGIN_WEBHOOK = "https://chaitu1.app.n8n.cloud/webhook-test/organizer-login";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Script Loaded");

    const loginButton = document.getElementById("login-btn");

    const usernameInput = document.getElementById("username");

    const passwordInput = document.getElementById("password");

    const loginMessage = document.getElementById("login-message");

    const loginSection = document.getElementById("login-section");

    const scannerSection = document.getElementById("scanner-section");

    const welcome = document.getElementById("welcome");

    loginButton.addEventListener("click", async () => {

        const username = usernameInput.value.trim();

        const password = passwordInput.value.trim();

        if(username === "" || password === ""){

            loginMessage.innerHTML = "Please enter username and password.";

            loginMessage.style.color = "red";

            return;

        }

        loginMessage.innerHTML = "Logging in...";

        loginMessage.style.color = "blue";

        try{

            const response = await fetch(LOGIN_WEBHOOK,{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    username:username,

                    password:password

                })

            });

            const data = await response.json();

            console.log(data);

            if(data.success){

                loginMessage.innerHTML="";

                loginSection.style.display="none";

                scannerSection.style.display="block";

                welcome.innerHTML=`Welcome ${data.organizer_name}`;

            }else{

                loginMessage.innerHTML=data.message;

                loginMessage.style.color="red";

            }

        }

        catch(error){

            console.error(error);

            loginMessage.innerHTML="Unable to connect to server.";

            loginMessage.style.color="red";

        }

    });

});
