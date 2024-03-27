function convertImages() {
    const input = document.getElementById("image-input");
    const output = document.getElementById("output");
    const files = input.files;
    const converter = new Worker("converter.js");
    converter.onmessage = (event) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(event.data);
      link.download = files[event.data.index].name.replace(/\.jpg$/, ".webp");
      link.click();
      output.innerHTML += `Converted image ${event.data.index} to WEBP.<br>`;
    };
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/jpeg")) {
        converter.postMessage({ index: i, file: file });
      }
    }
  }