// 📱 Mobile Navigation Toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// 📅 Dynamic Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// 📬 Contact Form Validation & Feedback
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual submission

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.textContent = "Please fill out all fields.";
    formStatus.style.color = "red";
    return;
  }

  // Simulate success (replace with actual backend integration)
  formStatus.textContent = "Thank you! Your inquiry has been received.";
  formStatus.style.color = "green";

  // Optionally clear form
  contactForm.reset();
});
