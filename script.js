const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const newEntry = {
    name,
    email,
    message,
    date: new Date().toLocaleString()
  };

  // Get existing data from LocalStorage
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Add new message
  messages.push(newEntry);

  // Save back to LocalStorage
  localStorage.setItem("messages", JSON.stringify(messages));

  successMsg.textContent = "Message saved successfully!";

  // Clear form
  form.reset();
});