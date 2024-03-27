const fetch = require('node-fetch');

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('images');
  const formData = new FormData();

  input.addEventListener('change', function() {
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[]`, files[i]);
    }
  });

  const button = document.querySelector('button');
  button.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/convert', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = data.downloadLink;
    downloadLink.style.display = 'block';
  });
});