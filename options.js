const fileInput  = document.getElementById('fileInput');
const sizeInput  = document.getElementById('sizeInput');
const previewImg = document.getElementById('preview');
const status     = document.getElementById('status');

fileInput.addEventListener('change', () => {
const file = fileInput.files[0];
if (!file) return;

let size = parseInt(sizeInput.value, 10);
if (isNaN(size) || size < 1) size = 40;

const reader = new FileReader();
reader.onload = () => {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width  = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        const dataUrl = canvas.toDataURL('image/png');
        previewImg.src     = dataUrl;
        previewImg.width   = size;
        previewImg.height  = size;

        chrome.storage.local.set({ cursorData: dataUrl }).then(() => {
            status.textContent = `アップロード＆${size}px×${size}pxにリサイズ完了！`;
        });
    };
    img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

sizeInput.addEventListener('input', () => {
    if (previewImg.src) {
    fileInput.dispatchEvent(new Event('change'));
    } 
});