function convertImages() {
    const input = document.getElementById('imageInput');
    const files = input.files;
    const output = document.getElementById('output');

    for (const file of files) {
        if (file.type.startsWith('image/jpeg')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const webp = canvas.toDataURL('image/webp');
                    const link = document.createElement('a');
                    link.href = webp;
                    link.download = `${file.name.replace(/\.jpeg$/, '.webp')}`;
                    link.click();
                    output.appendChild(link);
                };
            };
            reader.readAsDataURL(file);
        }
    }
}