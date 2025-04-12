document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const responseMessage = document.getElementById("message");
    responseMessage.textContent = "Registering...";

    try {
        const response = await fetch("http://yourserver.com/api/tutors/register", {  // Update with your actual endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.style.color = "green";
            responseMessage.textContent = "Account created successfully!";
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.error || "Registration failed.";
        }
    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Error connecting to the server.";
        console.error("Error:", error);
    }
});
