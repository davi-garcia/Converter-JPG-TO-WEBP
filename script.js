<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JPG to WEBP Converter</title>
</head>
<body>
    <input type="file" id="input-file" accept="image/jpeg" />
    <button id="convert-button" disabled>Convert to WEBP</button>
    <canvas id="canvas" style="display: none;"></canvas>
    <script>
        const inputFile = document.getElementById('input-file');
        const convertButton = document.getElementById('convert-button');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        inputFile.addEventListener('change', () => {
            const file = inputFile.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    convertButton.disabled = false;
                };
                img.src = event.target.result;
            };

            reader.readAsDataURL(file);
        });

        convertButton.addEventListener('click', async () => {
            convertButton.disabled = true;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp'));
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'converted.webp';
            link.click();
            URL.revokeObjectURL(url);
            convertButton.disabled = false;
        });
    </script>
</body>
</html>