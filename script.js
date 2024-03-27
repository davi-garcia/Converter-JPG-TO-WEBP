const fileInput = document.getElementById('file-input');
const convertButton = document.getElementById('convert-button');
const output = document.getElementById('output');
const downloadButton = document.getElementById('download-button');

const conversionQueue = [];
let currentConversionIndex = 0;

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    conversionQueue.length = 0;
    currentConversionIndex = 0;
    output.innerHTML = '';
    downloadButton.disabled = true;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/jpeg') || file.type.startsWith('image/jpg')) {
            conversionQueue.push(file);
        }
    }
    convertButton.disabled = conversionQueue.length === 0;
});

convertButton.addEventListener('click', () => {
    convertButton.disabled = true;
    const worker = new Worker('converter.js');
    worker.postMessage(conversionQueue[currentConversionIndex]);
    worker.addEventListener('message', (event) => {
        if (event.data.type === 'progress') {
            output.innerHTML += `<p>Converting ${conversionQueue[currentConversionIndex].name} ${Math.round(event.data.percentage * 100)}%</p>`;
        } else if (event.data.type === 'result') {
            output.innerHTML += `<p>Converted ${conversionQueue[currentConversionIndex].name}</p>`;
            currentConversionIndex++;
            if (currentConversionIndex < conversionQueue.length) {
                worker.postMessage(conversionQueue[currentConversionIndex]);
            } else {
                convertButton.disabled = false;
                downloadButton.disabled = false;
                worker.terminate();
            }
        }
    });
    if (currentConversionIndex === 0) {
        worker.postMessage(conversionQueue[currentConversionIndex]);
    }
});

function downloadAll() {
    const zip = new JSZip();
    const promises = [];
    for (let i = 0; i < conversionQueue.length; i++) {
        const file = conversionQueue[i];
        const filename = file.name.replace(/\.[^/.]*$/, '').toLowerCase();
        promises.push(
            fetch(URL.createObjectURL(file)).then((response) => response.blob())
            .then((blob) => zip.file(`${filename}.webp`, blob))
            .then(() => URL.revokeObjectURL(blob))
        );
    }
    Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then((blob) => {
            saveAs(blob, 'ConvertedImages.zip');
        });
    });
}

downloadButton.addEventListener('click', downloadAll);
