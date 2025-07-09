  document.getElementById('emailForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('emailInput').value;
      const res = await fetch('/api/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      document.getElementById('responseMsg').textContent = data.message;
    });
    
function toggleSupport() {
  const box = document.getElementById('support-box');
  box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

function sendSupport(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (email && message) {
    fetch('/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, message })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Message envoyé !");
      document.getElementById('support-form').reset();
      toggleSupport();
    })
    .catch(err => {
      alert("Erreur serveur.");
      console.error(err);
    });
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}
