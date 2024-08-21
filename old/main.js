// Define navigateTo function in the global scope
function navigateTo(select) {
    const url = select.value;
    if (url) {
        window.location.href = url;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.addEventListener('change', function() {
        navigateTo(this);
    });

    // Keyboard Shortcuts
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case '1':
                window.location.href = 'index.html';
                break;
            case '2':
                window.location.href = 'news.html';
                break;
            case 'ArrowUp':
                window.scrollBy(0, -window.innerHeight);
                break;
            case 'ArrowDown':
                window.scrollBy(0, window.innerHeight);
                break;
        }
    });
});