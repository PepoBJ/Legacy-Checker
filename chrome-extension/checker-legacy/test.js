

e = document.createElement('script');
    
e.id = 'script-test';
e.src= chrome.runtime.getURL('pep.js');
e.onload = function () {
    alert('cargado');
}
console.dir(e);
(document.head || document.documentElement).appendChild(e);