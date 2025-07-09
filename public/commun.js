
// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', expanded);
    });
  }
});

// Toggle boîte de support
function toggleSupport() {
  const box = document.getElementById('support-box');
  if (box) {
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
  }
}

// Envoi du message de support
function sendSupport(e) {
  e.preventDefault();

  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  if (!emailField || !messageField) return;

  const email = emailField.value.trim();
  const message = messageField.value.trim();

  if (email && message.trim().length > 0) {
   fetch('/api/support', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ email, message })
 })
 .then(res => {
   console.log('Status:', res.status);
   return res.json();
 })
 .then(data => {
   console.log('Response data:', data);
   if (data.success) {
     alert(data.message || "Message envoyé !");
   } else {
     alert(data.error || "Une erreur s'est produite.");
   }
   document.getElementById('support-form')?.reset();
   toggleSupport();
 })
 .catch(err => {
   alert("Erreur serveur.");
   console.error(err);
 });
}
}