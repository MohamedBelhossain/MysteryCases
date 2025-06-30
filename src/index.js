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