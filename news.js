document.addEventListener('DOMContentLoaded', () => {
    fetchData('data/news.csv', createNewsSections);

    function createNewsSections(newsItems) {
        console.log("Parsed news items:", newsItems); // Log parsed news items
        const container = document.getElementById('news-container');
        if (newsItems.length === 0) {
            console.error('No news items found.');
            return;
        }

        const fragment = document.createDocumentFragment();

        newsItems.forEach((item, index) => {
            if (!item.date || !item.content) {
                console.error('Missing date or content:', item);
                return;
            }

            const section = document.createElement('div');
            section.classList.add('news-section');
            if (index === 0) section.classList.add('first-section'); // Adds class to the first section
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
    Papa.parse(url, {
      download: true,
      header: true,
      complete: function(results) {
        console.log("Parsed data:", results.data); // Log parsed data
        callback(results.data);
      },
      error: function(error) {
        console.error('Error parsing CSV:', error);
      }
    });
}

function navigateTo(select) {
    const url = select.value;
    if (url) {
        window.location.href = url;
    }
}