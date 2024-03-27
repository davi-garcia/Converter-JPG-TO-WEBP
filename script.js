let images = [];

function uploadImages() {
    const input = document.getElementById('imageInput');
    for (const file of input.files) {
        images.push(file);
    }
    // Display the uploaded images in the 'output' div
    // Implement image conversion logic here
    enableDownloadButton();
}

function enableDownloadButton() {
    const button = document.getElementById('downloadButton');
    button.disabled = false;
}

function convertAndDownload() {
    // Convert the images using a library like `fabric.js` or `canvas.js`
    // ...
    // Create a single download link for all the images
    const link = document.createElement('a');
    link.download = 'converted_images.zip';
    link.href = 'data:application/zip;base64,...';
    link.click();
}