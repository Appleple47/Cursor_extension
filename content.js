(async () => {
  const { cursorData } = await chrome.storage.local.get('cursorData');
  if (!cursorData) return;
  const style = document.createElement('style');
  style.textContent = `
    * {
    cursor: url(${cursorData}) 16 16, auto !important;
    }
    `;
    (document.head || document.documentElement).appendChild(style);
    
  })();