self.onmessage = function (event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const result = canvas.toDataURL("image/webp");
        const binary = atob(result.split(",")[1]);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }
        self.postMessage({ index: event.data.index, binary: array }, [array.buffer]);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(event.data.file);
  };