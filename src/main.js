const launchApp = () => {
    if (document.getElementById('general-checker')) {
        alert('Ya se desplego el validador!');

        return false;
    }

    renderCSS();
    renderHTML();

    window.requestAnimationFrame(() => {
        renderEvents();
    });
}

launchApp();
