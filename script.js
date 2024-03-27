const fileInput = document.getElementById('file-input');
const convertButton = document.getElementById('convert-button');
const output = document.getElementById('output');

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length === 0) {
        return;
    }
    output.innerHTML = '';
    convertButton.disabled = false;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const originalImage = new Image();
        originalImage.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;

            const context = canvas.getContext('2d');
            context.drawImage(originalImage, 0, 0);

            const imageBlob = new Blob([canvas.toDataURL('image/webp')], {
                type: 'image/webp',
            });

            const url = URL.createObjectURL(imageBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${file.name}.webp`;
            downloadLink.click();
            URL.revokeObjectURL(url);
        };
        originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);

    convertButton.disabled = true;
});

convertButton.addEventListener('click', () => {
    if (fileInput.files.length === 0) {
        return;
    }
    const file = fileInput.files[0];
    const fileInputClone = fileInput.cloneNode(true);
    fileInputClone.value = '';
    fileInput.parentNode.insertBefore(fileInputClone, fileInput.nextSibling);
    fileInput.files = [];
    fileInput.disabled = true;
    fileInput.parentNode.removeChild(fileInput);
    convertButton.disabled = true;
});
