document.addEventListener('DOMContentLoaded', () => {
    fetchData('data/news.json', createNewsSections);

    function createNewsSections(newsItems) {
        const container = document.getElementById('news-container');
        const fragment = document.createDocumentFragment();

        newsItems.forEach((item, index) => {
            const section = document.createElement('div');
            section.classList.add('news-section');
            if (index === 0) section.classList.add('first-section'); // Adds class to first section
            const content = document.createElement('div');
            content.classList.add('news-content');
            content.innerHTML = `
                <span class="news-date">${item.date}:</span>
                <span class="news-text">${item.content}</span>
            `;
            section.appendChild(content);
            fragment.appendChild(section);
        });

        container.appendChild(fragment);
    }
});

function fetchData(url, callback) {
    fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject('Network error'))
      .then(data => callback(data))
      .catch(console.error);
}

function navigateTo(select) {
    const url = select.value;
    if (url) {
        window.location.href = url;
    }
}