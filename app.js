const iframe = document.querySelector('#app');
const estado = document.querySelector('#estado');
const url = window.controlFinancieroUrl;
if (/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec\/pwa$/.test(url)) {
  iframe.src = url;
  iframe.hidden = false;
  estado.hidden = true;
} else {
  estado.textContent = 'La conexión con Apps Script está pendiente de publicación.';
}

const instalar = document.querySelector('#instalar');
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  instalar.hidden = false;
  instalar.onclick = async () => {
    instalar.hidden = true;
    await event.prompt();
  };
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).catch(console.warn);
}
